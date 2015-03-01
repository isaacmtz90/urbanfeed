import ferris3 as f3
import protopigeon
from protorpc import messages
from google.appengine.ext import ndb
from ferris3 import Model, Service, hvild, auto_service
from app.models.channel import Channel
from app.models.city import City

ChannelMessage = f3.model_message(Channel)
MultiMessage = protopigeon.list_message(ChannelMessage)

@auto_service
class ChannelsService(Service):
	list = hvild.list(Channel)
	get = hvild.get(Channel)
	delete = hvild.delete(Channel)
	insert = hvild.insert(Channel)
	update = hvild.update(Channel)


	@f3.auto_method(returns= MultiMessage, http_method="GET", name="get_featured")
	def by_channels(self,request,):
		
		cha_msgs= Channel.query(
			Channel.is_featured == True
		)
			
		if cha_msgs is not None:
			return f3.messages.serialize_list(MultiMessage, cha_msgs)
		else:
			 raise f3.NotFoundException()


	@f3.auto_method(returns= MultiMessage, http_method="GET", name="get_by_city")
	def by_city(self,request,  city=(str,), country=(str,)):
		parsed_city_key= (city+"-"+country).lower()
		city_key= ndb.Key(City,parsed_city_key)
		if(city_key):
			cha_msgs= Channel.query(
				Channel.city == city_key
			)
			
			if cha_msgs is not None:
				return f3.messages.serialize_list(MultiMessage, cha_msgs)
			else:
				 raise f3.NotFoundException()