from google.appengine.ext import ndb
from ferris3 import Model


class Subscriber(Model):
    object_id = ndb.StringProperty()
    password = ndb.StringProperty()
    channels = ndb.StringProperty(repeated=True)

    @classmethod
    def get_by_obj_id(cls,obj_id):
    	return cls.query(cls.object_id==obj_id)
