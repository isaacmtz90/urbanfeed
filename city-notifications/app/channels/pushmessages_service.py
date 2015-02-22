import ferris3 as f3
import protopigeon
import logging
import urllib
import json
from protorpc import messages
from google.appengine.ext import ndb
from google.appengine.api import urlfetch
from ferris3 import Model, Service, hvild, auto_service
from app.models.message import PushMessage
from app.models.channel import Channel

"""
mszxzS42wKud0ojfP0jJr8klsNCT9k8Js9JMf6ZW8 remove the 8
83BHgK79PTFlYGAec9nIG2dtkFoyXoFGJEVplMW add a Q
"""
MessageMsg = protopigeon.model_message(PushMessage)

MultiMessage = protopigeon.list_message(MessageMsg)


@auto_service
class MessagesService(Service):
	list = hvild.list(PushMessage)
	get = hvild.get(PushMessage)
	delete = hvild.delete(PushMessage)
	insert = hvild.insert(PushMessage)
	update = hvild.update(PushMessage)



	@f3.auto_method(returns= MessageMsg, http_method="POST", name="create_and_notify")
	def create_and_notify(delf,request,channel_name=(str,), channel_id=(str,),title=(str,),content=(str,)):
		
		broadcasted_msg = PushMessage(channel_id=channel_id, channel_name=channel_name, title=title,content=content)
		datamsg=f3.messages.serialize(MessageMsg,broadcasted_msg)
		broadcasted_msg.put()
		parse_chName=channel_name.replace(" ","")
		url="https://api.parse.com/1/push"
		payload_content= {
		'channels': [parse_chName],
		'data':{'alert': channel_name+ ": " + title+"-"+ content}
		}
		result = urlfetch.fetch(url=url,
			payload= json.dumps(payload_content),
			method=urlfetch.POST,
    		headers={'Content-Type': 'application/json',
    				'X-Parse-Application-Id':'###above',
    				'X-Parse-REST-API-Key':'###above'})
			
		return datamsg

	@f3.auto_method(returns= MultiMessage, http_method="GET", name="get_by_channel")
	def by_channel(delf,request,channelid=(str,)):
		cha_msgs= PushMessage.query(
			PushMessage.channel_id == channelid
		)
			
		if cha_msgs is not None:
			return f3.messages.serialize_list(MultiMessage, cha_msgs)
		else:
			 raise f3.NotFoundException()

	@f3.auto_method(returns= MultiMessage, http_method="GET", name="get_by_channels")
	def by_channels(delf,request,channels=(str,)):
		selected_channels= channels.split(",")
		cha_msgs= PushMessage.query(
			PushMessage.channel_id.IN(selected_channels)
		)
			
		if cha_msgs is not None:
			return f3.messages.serialize_list(MultiMessage, cha_msgs)
		else:
			 raise f3.NotFoundException()

	@f3.auto_method(returns= MultiMessage, http_method="GET", name="get_by_latest_in_channels")
	def by_latest(delf,request):
		
		cha_msgs= PushMessage.query().order(-PushMessage.date)
			
		if cha_msgs is not None:
			return f3.messages.serialize_list(MultiMessage, cha_msgs)
		else:
			 raise f3.NotFoundException()
