from google.appengine.ext import ndb
from ferris3 import Model


class City(Model):
	#keyname= city-country
    name = ndb.StringProperty(required=True)
    country= ndb.StringProperty(required=True)
    
    @classmethod
    def get_or_create_city(cls, keyname, object=None):
        key = ndb.Key(City, keyname)
        ent = key.get()
        if ent is None:
            ent = object
            ent.key = key
            ent.put()
        return ent
