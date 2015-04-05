from google.appengine.ext import ndb
from ferris3 import Model


class Subscriber(Model):
    object_id = ndb.StringProperty()
    email = ndb.StringProperty()
    sms_enabled = ndb.BooleanProperty(default=True)
    sms_verified= ndb.BooleanProperty(default=False)
    sms_verification_code = ndb.StringProperty ()
    email_enabled = ndb.BooleanProperty(default=True)
    email_verified= ndb.BooleanProperty(default=False)
    email_verification_code = ndb.StringProperty ()
    phone_number = ndb.StringProperty()
    password = ndb.StringProperty()
    channels = ndb.StringProperty(repeated=True)

    @classmethod
    def get_by_obj_id(cls,obj_id):
    	return cls.query(cls.object_id==obj_id)
