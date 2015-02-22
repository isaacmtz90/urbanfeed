import ferris3 as f3
import protopigeon
from protorpc import messages
from ferris3 import Model, Service, hvild, auto_service
from app.models.channel import Channel

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
	def by_channels(delf,request,):
		
		cha_msgs= Channel.query(
			Channel.is_featured == True
		)
			
		if cha_msgs is not None:
			return f3.messages.serialize_list(MultiMessage, cha_msgs)
		else:
			 raise f3.NotFoundException()
