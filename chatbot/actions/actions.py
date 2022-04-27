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
        res= f"Hey {username} ! How are you?"

                 # extract a joke from returned json response
        dispatcher.utter_message(res)  # send the message back to the user
        return [] 


class getUserid(Action):

    def name(self) -> Text:
        return "set_slot_userid"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       
        userid = tracker.sender_id
        print("setting userid slot")
        print(userid)
        dispatcher.utter_message("Welcome to Scale IT")  # send the message back to the user
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


        request = json.loads(requests.get(f"http://localhost:5000/api/performance/scorebyworkspace/{userid}/{workspaceid}").text)

        score = request["score"]
        text =str(score)
        res= f"your score is {text}, you always can do better !"
                 # extract a joke from returned json response
        dispatcher.utter_message(res)  # send the message back to the user
        return []

class getrankworkspace(Action):

    def name(self) -> Text:
        return "rank_member_workspace"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        workspaceid = tracker.get_slot("workspaceid")

        request = json.loads(requests.get(f"http://localhost:5000/api/performance/getrankworkspaceleaderboard/{workspaceid}/{userid}").text)

        rank = request["rank"]
        text =str(rank)
        res= f"your rank is {text}, not bad after all !"
                 # extract a joke from returned json response
        dispatcher.utter_message(res)  # send the message back to the user
        return []

class getroleinworkspace(Action):

    def name(self) -> Text:
        return "role_member_workspace"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        workspaceid = tracker.get_slot("workspaceid")

        request = json.loads(requests.get(f"http://localhost:5000/api/performance/roleinworkspace/{workspaceid}/{userid}").text)

        role = request["role"]
        text =str(role)
        res= f"your role is {text}"
        
                 # extract a joke from returned json response
        dispatcher.utter_message(res)  # send the message back to the user
        return []

class getprojectsinworkspace(Action):

    def name(self) -> Text:
        return "projects_member_workspace"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        workspaceid = tracker.get_slot("workspaceid")

        request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/listbymember/{workspaceid}/{userid}").text)
        print(request)
        projects = request["data"]
        
                 # extract a joke from returned json response
        dispatcher.utter_message(json_message=projects)  # send the message back to the user
        return []