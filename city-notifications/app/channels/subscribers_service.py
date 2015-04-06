import ferris3 as f3
import protopigeon
import logging
from protorpc import messages
from random import randint
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from ferris3 import Model, Service, hvild, auto_service
from app.models.message import PushMessage
from app.models.channel import Channel
from app.models.subscriber import Subscriber


SubMsg = protopigeon.model_message(Subscriber)

MultiMessage = protopigeon.list_message(SubMsg)
class BooleanMessage(messages.Message):
    value = messages.BooleanField(1)

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

@auto_service
class SubscribersService(Service):
	
	get = hvild.get(Subscriber)	
	

	@f3.auto_method(returns= BooleanMessage, http_method="POST", name="insert_subscriber")
	def insert_subscriber(delf,request=(SubMsg,)):
		response=BooleanMessage(value=True);
		sub_to_insert= Subscriber(
			object_id = request.email,
			email = request.email,
			sms_enabled = request.sms_enabled,
			email_enabled = request.email_enabled,
			password =  SHA256.new(request.password).hexdigest(),
			channels=[],
			sms_verification_code = str(random_with_N_digits(4)),
			email_verification_code= SHA256.new(request.email).hexdigest(),
	   		phone_number= request.phone_number);
		try:
   			sub_to_insert.put()
   			return response;
   		except:
   			response=BooleanMessage(value=False);
   			return response;

   

	@f3.auto_method(returns= SubMsg, http_method="GET", name="get_by_object_id")
	def get_by_obj_id(delf,request,objectId=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get()		
		return f3.messages.serialize(SubMsg, value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="validate")
	def validate(delf,request,objectId=(str,), password=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get();
		if SHA256.new(password).hexdigest() == value.password :
			return f3.messages.serialize(SubMsg, value)
		else:
			raise f3.NotFoundException()

	@f3.auto_method(returns= SubMsg, http_method="POST", name="add_channel")
	def add_channel(delf,request,channelid=(str,),objectId=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get()
		if value is not None:
			if channelid not in value.channels:
				value.channels.append(channelid)
				value.put()
			else:
				raise f3.NotFoundException()
		return f3.messages.serialize(SubMsg, value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="remove_channel")
	def remove_channel(delf,request,channelid=(str,),objectId=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get()
		if value is not None:
			value.channels.remove(channelid)
			value.put()
		else:
			raise f3.NotFoundException()
		return f3.messages.serialize(SubMsg, value)
		
		
