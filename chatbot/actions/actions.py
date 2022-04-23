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



class getusernameAction(Action):

    def name(self) -> Text:
        return "get_slot_username"

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


class getUserid(Action):

    def name(self) -> Text:
        return "set_slot_userid"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       
        userid = tracker.sender_id
        print("setting userid slot")
        print(userid)
        return [SlotSet("userid" , userid)] 
        # SlotSet("userid" , "622ef3a0399260d13597b4cf")
       

# class getWorkspaceid(Action):

#     def name(self) -> Text:
#         return "set_slot_workspaceid"

#     async def run(
#             self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
#     ) -> List[Dict[Text, Any]]:
       
#         workspaceid = tracker.sender_id
#         print("setting workspaceid slot")
#         print(workspaceid)
#         return [SlotSet("workspaceid" , workspaceid)] 
#         # SlotSet("userid" , "622ef3a0399260d13597b4cf")
    

class getscoreworkspace(Action):

    def name(self) -> Text:
        return "score_member_workspace"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        workspaceid = tracker.get_slot("workspaceid")
        print("userid")
        print(userid)

        print("workspaceid")
        print(workspaceid)


        request = json.loads(requests.get(f"http://localhost:5000/api/performance/scorebyworkspace/{userid}/{workspaceid}").text)
        print("request")
        print(request)

        score = request["score"]
        print("score")
        print(score)
        text =str(score)
                 # extract a joke from returned json response
        dispatcher.utter_message(text)  # send the message back to the user
        return []

class getrankworkspace(Action):

    def name(self) -> Text:
        return "rank_member_workspace"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        workspaceid = tracker.get_slot("workspaceid")
        print("userid")
        print(userid)

        print("workspaceid")
        print(workspaceid)


        request = json.loads(requests.get(f"http://localhost:5000/api/performance/getrankworkspaceleaderboard/{workspaceid}/{userid}").text)
        print("request")
        print(request)

        rank = request["rank"]
        print("rank")
        print(rank)
        text =str(rank)
                 # extract a joke from returned json response
        dispatcher.utter_message(text)  # send the message back to the user
        return []