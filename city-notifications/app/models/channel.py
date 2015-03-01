from google.appengine.ext import ndb
from ferris3 import Model
from app.models.city import City

class Channel(Model):
    name = ndb.StringProperty(required=True)
    short_id= ndb.StringProperty(required=True)
    city = ndb.KeyProperty(kind='City')
    logo_url = ndb.StringProperty()
    admin_account = ndb.StringProperty()
    is_featured = ndb.BooleanProperty(default=False, required=True)
