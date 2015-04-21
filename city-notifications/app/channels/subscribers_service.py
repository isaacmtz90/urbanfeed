import ferris3 as f3
import protopigeon
import logging
from protorpc import messages
from random import randint
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from google.appengine.api import mail
from twilio.rest import TwilioRestClient
from ferris3 import Model, Service, hvild, auto_service
from app.models.message import PushMessage
from app.models.channel import Channel
from app.models.subscriber import Subscriber

twilio_acc ='ACdeb5d6152c18963a8ec4889adf23d2f6'
twilio_tkn=  'bd6c2ceb49775ddcbc1a4fc33cf1f631'

SubMsg = protopigeon.model_message(Subscriber)
Verification_URL= "http://urban-feed.appspot.com/console/index.html#/email_validation?";
MultiMessage = protopigeon.list_message(SubMsg)
class BooleanMessage(messages.Message):
    subscriber_value = messages.BooleanField(1)

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

@auto_service
class SubscribersService(Service):
	
	get = hvild.get(Subscriber)	
	
	@f3.auto_method(returns= BooleanMessage, http_method="POST", name="insert_subscriber")
	def insert_subscriber(delf,request=(SubMsg,)):
		response=BooleanMessage(subscriber_value=True);
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
   			mail.send_mail(sender="UrbanFeed@city-notifications.appspotmail.com",
	              to=sub_to_insert.email,
	              subject="Email Verification- UrbanFeed",
	              body= "Please follow this link to verify your email: "
	              		+Verification_URL+ "email="+sub_to_insert.email+ "&verification_code="
	              		+sub_to_insert.email_verification_code);4
   			if sub_to_insert.phone_number:
   				client = TwilioRestClient(twilio_acc, twilio_tkn)
   				message = client.messages.create(to="+"+sub_to_insert.phone_number,
   						 from_="+12057915054", body="You verification code is: "+sub_to_insert.sms_verification_code);
   			return response;
   		except:
   			response=BooleanMessage(subscriber_value=False);
   			return response;

   	@f3.auto_method(returns= BooleanMessage, http_method="POST", name="insert")
	def insert(delf,request=(SubMsg,)):
		response=BooleanMessage(subscriber_value=True);
		sub_to_insert= Subscriber(
			object_id = request.object_id,
			email = 'none',
			sms_enabled = False,
			email_enabled = False,
			password =  'none',
			channels=[],
			sms_verification_code ='',
			email_verification_code= '',
	   		phone_number= '');
		try:
   			sub_to_insert.put()
   			
   		except:
   			response=BooleanMessage(subscriber_value=False);
   		
   		return response;

	@f3.auto_method(returns= SubMsg, http_method="GET", name="get_by_object_id")
	def get_by_obj_id(delf,request,objectId=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get()		
		return f3.messages.serialize(SubMsg, subscriber_value)

	@f3.auto_method( http_method="POST", name="resend_sms_verification")
	def resend_sms_verification(delf,request,objectId=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get()		
		if subscriber_value is not None:
			client = TwilioRestClient(twilio_acc, twilio_tkn)
 			message = client.messages.create(to="+"+subscriber_value.phone_number,
 					 from_="+12057915054", body="You verification code is: "+subscriber_value.sms_verification_code);
 		else:
				raise f3.NotFoundException()
		

	@f3.auto_method(returns= SubMsg, http_method="POST", name="validate")
	def validate(delf,request,objectId=(str,), password=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get();
		if SHA256.new(password).hexdigest() == subscriber_value.password :
			return f3.messages.serialize(SubMsg, subscriber_value)
		else:
			raise f3.NotFoundException()

	@f3.auto_method(returns= SubMsg, http_method="POST", name="verify_email")
	def verify_email(delf,request,objectId=(str,), verification_code=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get()
		if subscriber_value is not None:
			if subscriber_value.email_verification_code == verification_code:
				subscriber_value.email_verified=True
				subscriber_value.put()
			else:
				raise f3.NotFoundException()
		return f3.messages.serialize(SubMsg, subscriber_value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="verify_sms")
	def verify_sms(delf,request,objectId=(str,), verification_code=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get()
		if subscriber_value is not None:
			if subscriber_value.sms_verification_code == verification_code:
				subscriber_value.sms_verified=True
				subscriber_value.put()
			else:
				raise f3.NotFoundException()
		return f3.messages.serialize(SubMsg, subscriber_value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="add_channel")
	def add_channel(delf,request,channelid=(str,),objectId=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get()
		if subscriber_value is not None:
			if channelid not in subscriber_value.channels:
				subscriber_value.channels.append(channelid)
				subscriber_value.put()
			else:
				raise f3.NotFoundException()
		return f3.messages.serialize(SubMsg, subscriber_value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="remove_channel")
	def remove_channel(delf,request,channelid=(str,),objectId=(str,)):
		subscriber_value= Subscriber.get_by_obj_id(objectId).get()
		if subscriber_value is not None:
			subscriber_value.channels.remove(channelid)
			subscriber_value.put()
		else:
			raise f3.NotFoundException()
		return f3.messages.serialize(SubMsg, subscriber_value)
		
		
