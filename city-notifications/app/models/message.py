from google.appengine.ext import ndb
from ferris3 import Model
from app.models.channel import Channel


class PushMessage(Model):
    
    channel_id= ndb.StringProperty(required=True)
    channel_name= ndb.StringProperty(required= True)
    title = ndb.StringProperty()
    content = ndb.TextProperty(required= True)
    date = ndb.DateTimeProperty(auto_now = True, required= True)