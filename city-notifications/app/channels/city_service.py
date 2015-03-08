import ferris3 as f3
import protopigeon
import logging
from protorpc import messages
from google.appengine.ext import ndb
from ferris3 import Model, Service, hvild, auto_service
from app.models.city import City



SubMsg = protopigeon.model_message(City)

MultiMessage = protopigeon.list_message(SubMsg)



@auto_service
class CityService(Service):
	list = hvild.list(City)
	get = hvild.get_by_keyname(City)
	delete = hvild.delete(City)
	insert = hvild.insert_with_keyname(City)
	update = hvild.update(City)


		
