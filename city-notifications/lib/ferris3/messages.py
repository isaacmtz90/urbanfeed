from protorpc import messages
import protopigeon
import logging

model_message = protopigeon.model_message
list_message = protopigeon.list_message
compose = protopigeon.compose


def serialize(MessageType, entity, **kwargs):
    return protopigeon.to_message(entity, MessageType, **kwargs)


def deserialize(Model, message, **kwargs):
    return protopigeon.to_entity(message, Model, **kwargs)


def serialize_list(ListMessageType, entities):
    from .ndb import PaginationResults
    from .search import SearchResults

    if isinstance(entities, (PaginationResults, SearchResults)):
        next_page_token = entities.next_page_token
        entities = entities.items
    else:
        next_page_token = None

    MessageType = ListMessageType.items.message_type

    message = ListMessageType()
    message.items = [serialize(MessageType, x) for x in entities]
    message.nextPageToken = next_page_token

    return message


class KeynameMessage(messages.Message):
    keyname = messages.StringField(1)
    parent = messages.StringField(2)


def model_message_with_keyname(Model):
    return protopigeon.compose(model_message(Model), KeynameMessage)