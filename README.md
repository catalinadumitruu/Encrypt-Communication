# Encrypt-Communication
This project implements the task required for the first assignment for Web and Cloud Security.

#Instructions:
- run server.js
- run websocket.js
- open broswer and go to http://localhost:8081 (the main page for this project)

1. HTML page which encrypt the JSON content with JavaScript and send the content via WS - WebSocket to a server-side program: node.js or Java.
	- this task is implemented by having a Rest Client where we can find a button ("Click me to open webSocket and send encyrpted json") which 
triggers the opening of websocket and sends a hardcoded json to the server. The servers receives the encrypted message and decrypts it in order
to display it.

2. REST Client (in a web page) which send REST requests (POST and DELETE) for an additional JSON for the user
3. Enhance the restServer.js from the lecture and lab in order to:
3.1) encrypt/decrypt json payload
3.2) insert in users.json file and respectively delete the user from the users.json
	-These last 2 tasks are implemented using the same REST client as above.

	Please, be aware that in this phase you must start the testing with an encrypted JSON. All these details, as well as the json format, are given in
the first part of the page. Also, in the received zip is found an encrypted json of users.  
