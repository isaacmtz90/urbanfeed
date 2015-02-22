from google.appengine.ext import ndb
from ferris3 import Model


class Channel(Model):
    name = ndb.StringProperty(required=True)
    short_id= ndb.StringProperty(required=True)
    logo_url = ndb.StringProperty()
    admin_account = ndb.StringProperty()
    is_featured = ndb.BooleanProperty(default=False, required=True)
