from typing import Text, List, Optional, Dict, Any
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk import Tracker, Action 
from rasa_sdk.events import SlotSet
import os
import requests
import json
import uuid

# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

class NodeApi(Action):

    def name(self) -> Text:
        return "node_api"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        request = json.loads(requests.get("http://localhost:5000/api/performance/test").text)
        text = request["message"]
                 # extract a joke from returned json response
        dispatcher.utter_message(text)  # send the message back to the user
        return []



class userAction(Action):

    def name(self) -> Text:
        return "user_action"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        # SlotSet("userid" , "622ef3a0399260d13597b4cf")
        userid = tracker.get_slot("userid")
        # print("user id")
        # print(userid)
        request = json.loads(requests.get(f"http://localhost:5000/api/members/connecteduser/{userid}").text)
        username = request["message"]
        print(username)
                 # extract a joke from returned json response
        dispatcher.utter_message(username)  # send the message back to the user
        return [SlotSet("username" , username)] 


class setSlotAction(Action):

    def name(self) -> Text:
        return "set_slot_action"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       
        userid = tracker.sender_id
        print("getting slot")
        print(userid)
        return [SlotSet("userid" , userid)] 
        # SlotSet("userid" , "622ef3a0399260d13597b4cf")
       

    