import ferris3 as f3
import protopigeon
import logging
from protorpc import messages
from google.appengine.ext import ndb
from ferris3 import Model, Service, hvild, auto_service
from app.models.message import PushMessage
from app.models.channel import Channel
from app.models.subscriber import Subscriber


SubMsg = protopigeon.model_message(Subscriber)

MultiMessage = protopigeon.list_message(SubMsg)


@auto_service
class SubscribersService(Service):
	list = hvild.list(Subscriber)
	get = hvild.get(Subscriber)
	delete = hvild.delete(Subscriber)
	insert = hvild.insert(Subscriber)
	update = hvild.update(Subscriber)

	@f3.auto_method(returns= SubMsg, http_method="GET", name="get_by_object_id")
	def get_by_obj_id(delf,request,objectId=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get()		
		return f3.messages.serialize(SubMsg, value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="add_channel")
	def add_channel(delf,request,channelid=(str,),objectId=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get()
		if value is not None:
			if channelid not in value.channels:
				value.channels.append(channelid)
				value.put()
		
		return f3.messages.serialize(SubMsg, value)

	@f3.auto_method(returns= SubMsg, http_method="POST", name="remove_channel")
	def remove_channel(delf,request,channelid=(str,),objectId=(str,)):
		value= Subscriber.get_by_obj_id(objectId).get()
		if value is not None:
			value.channels.remove(channelid)
			value.put()
		
		return f3.messages.serialize(SubMsg, value)
		
		
