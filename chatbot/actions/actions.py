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


class getworkspacenameAction(Action):

    def name(self) -> Text:
        return "get_slot_workspacename"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        workspaceid = tracker.get_slot("workspaceid")
        print(workspaceid)
        x=next(tracker.get_latest_entity_values("workspaceid"), None)
        print(x)

        if(workspaceid == None):
            dispatcher.utter_message("you didn't enter any workspace")
        else :
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/workspacename/{workspaceid}").text)
            workspacename = request["name"]
            res= f"you have entered the {workspacename} workspace "
            dispatcher.utter_message(res)  
        return [] 

class getprojectnameAction(Action):

    def name(self) -> Text:
        return "get_slot_projectname"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else :
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/projectename/{projectid}").text)
            projectname = request["name"]
            res= f"you have entered the {projectname} project "
            dispatcher.utter_message(res)  
        return [] 

class getUserid(Action):

    def name(self) -> Text:
        return "set_slot_userid"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       
        userid = tracker.sender_id
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

        if(workspaceid == None):
            dispatcher.utter_message("you didn't enter any workspace")
        else :
            request = json.loads(requests.get(f"http://localhost:5000/api/performance/scorebyworkspace/{userid}/{workspaceid}").text)

            score = request["score"]
            text =str(score)
            res= f"your score is {text}, you always can do better !"
                    # extract a joke from returned json response
            dispatcher.utter_message(res)  # send the message back to the user
        
        return []

class getscoreproject(Action):

    def name(self) -> Text:
        return "score_member_project"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else :
            request = json.loads(requests.get(f"http://localhost:5000/api/performance/scorebyproject/{userid}/{projectid}").text)
            score = request["score"]
            text =str(score)
            res= f"your score in this project is {text}, you always can do better !"
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

        if(workspaceid == None):
            dispatcher.utter_message("you didn't enter any workspace")
        else :
            request = json.loads(requests.get(f"http://localhost:5000/api/performance/getrankworkspaceleaderboard/{workspaceid}/{userid}").text)

            rank = request["rank"]
            text =str(rank)
            res= f"your rank is {text}, not bad after all !"
                 # extract a joke from returned json response
            dispatcher.utter_message(res)  # send the message back to the user

        
        return []

class getrankproject(Action):

    def name(self) -> Text:
        return "rank_member_project"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else :
            request = json.loads(requests.get(f"http://localhost:5000/api/performance/getrankprojectleaderboard/{projectid}/{userid}").text)
            rank = request["rank"]
            text =str(rank)
            res= f"your rank in this project is {text}, not bad after all !"
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

        if(workspaceid == None):
            dispatcher.utter_message("you didn't enter any workspace")
        else: 
            request = json.loads(requests.get(f"http://localhost:5000/api/performance/roleinworkspace/{workspaceid}/{userid}").text)

            role = request["role"]
            text =str(role)
            res= f"your role is {text}"
            dispatcher.utter_message(res)
                 # extract a joke from returned json response
          # send the message back to the user
        return []

class getroleinproject(Action):

    def name(self) -> Text:
        return "role_member_project"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else: 
            request = json.loads(requests.get(f"http://localhost:5000/api/performance/roleinproject/{projectid}/{userid}").text)
            role = request["role"]
            text =str(role)
            res= f"your role is {text}"
            dispatcher.utter_message(res)
                 # extract a joke from returned json response
          # send the message back to the user
        return []

class getprojectsinworkspace(Action):

    def name(self) -> Text:
        return "projects_member_workspace"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        workspaceid = tracker.get_slot("workspaceid")

        if(workspaceid == None):
            dispatcher.utter_message("you didn't enter any workspace")
        else: 
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/listbymember/{workspaceid}/{userid}").text)
            projects = request["data"]
            
                    # extract a joke from returned json response
            dispatcher.utter_message(json_message=projects)  # send the message back to the user
                
        return []

class getalltasksinproject(Action):

    def name(self) -> Text:
        return "tasks_member_inproject"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else:
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/alltasks/{projectid}/{userid}").text)
            tasks = request["tasks"]
            
                    # extract a joke from returned json response
            dispatcher.utter_message(json_message=tasks)  # send the message back to the user
                
        return []

class gettodotasksinproject(Action):

    def name(self) -> Text:
        return "todotasks_member_inproject"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else:
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/todotasks/{projectid}/{userid}").text)
            todotasks = request["tasks"]
            if(todotasks == []):
                dispatcher.utter_message("you have no tasks to do")
            else:
                dispatcher.utter_message(json_message=todotasks)  
                
        return []

class getdoingtasksinproject(Action):

    def name(self) -> Text:
        return "doingtasks_member_inproject"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else:
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/doingtasks/{projectid}/{userid}").text)
            doingtasks = request["tasks"]
            
            if(doingtasks == []):
                dispatcher.utter_message("you are not doing any tasks")
            else:
                dispatcher.utter_message(json_message=doingtasks)
                
        return []

class getreviewtasksinproject(Action):

    def name(self) -> Text:
        return "reviewtasks_member_inproject"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else:
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/reviewtasks/{projectid}/{userid}").text)
            reviewtasks = request["tasks"]
            
            if(reviewtasks == []):
                dispatcher.utter_message("you have no tasks in review")
            else:
                dispatcher.utter_message(json_message=reviewtasks)
                
        return []

class getdonetasksinproject(Action):

    def name(self) -> Text:
        return "donetasks_member_inproject"

    async def run(
            self, dispatcher, tracker: Tracker, domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
       

        userid = tracker.get_slot("userid")
        projectid = tracker.get_slot("projectid")

        if(projectid == None):
            dispatcher.utter_message("you didn't enter any project")
        else:
            request = json.loads(requests.get(f"http://localhost:5000/api/chatbot/donetasks/{projectid}/{userid}").text)
            donetasks = request["tasks"]
            if(donetasks == []):
                dispatcher.utter_message("you didn't finish any task yet ")
            else:
                dispatcher.utter_message(json_message=donetasks)
                
        return []