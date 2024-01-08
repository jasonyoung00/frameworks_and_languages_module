Technical Report
================
This technical report is to convey information in a clear, concise and easily accessible format about the frameworks used, what problems the frameworks used are trying to solve and what further recommendations could be made to improve the digital artifact. It is divided into sections detailing issues, features and recommendations of which frameworks are best to solve a given problem. Furthermore, issues found with both server and client frameworks showing the limits of each framework used are shown and elaborated on and features of said frameworks and the problem they are trying to solve are divulged with the benefits of a framework's features are stated. Recommendations of frameworks and why they should be used in regards to what the features of a framework do and what framework to use to avoid the stated issues.
(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()why the example server/client is bad. why using framework instead will be good/better.
below are some issues with said prototype (example_server & example_client)

### Error Handling

(A code snippet example demonstrating the issue)
```python
return {'code': 404, 'body': 'no route'}
```
(Explain why this pattern is problematic - 40ish words)
If the incoming request does not match, the error message will always be a 404 regardless if it is or isn't. This will make bug fixing difficult/almost impossible as the developer will not have the necessary information about what is going wrong to fix said error.

### (name of Issue 2)

(A code snippet example demonstrating the issue)
```python

```
(Explain why this pattern is problematic - 40ish words)


### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

### Request & Response Objects

(Technical description of the feature - 40ish words)
Falcon responds to HTTP requests by coordinating with app functions using the inversion of control (IoC) technique. The request and response objects that reflect the current in-flight HTTP request are referenced by resource responders, middleware methods, hooks, etc.

(A code block snippet example demonstrating the feature)
```python
def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        # get the file client.html and send it to the client page
        with open('client.html', 'r') as f:
            resp.body = f.read()
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)


(Provide reference urls to your sources of information about the feature - required)
https://falcon.readthedocs.io/en/stable/api/request_and_response.html

### WebSocket Support

(Technical description of the feature - 40ish words)
Persistent bidirectional communication is possible with Falcon's WebSocket support. It allows real time client updates and can be used when new information is made available. For example, on a store webpage when a product goes from being in-stock to out-of-stock and the users that are "listening" that area can be notified of the change through the WebSocket.

(A code block snippet example demonstrating the feature)
```python
async def on_websocket(self, req: Request, ws: WebSocket, account_id: str):
    pass
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
Although, while the proof of concept is applicable, the WebSocket might run into scalability issues as handling numerous concurrent connections will be difficult with python. Furthermore, using a different approach for applications that have a larger scale would be handled without as many concurrent connection problems. 

(Provide reference urls to your sources of information about the feature - required)
https://falcon.readthedocs.io/en/stable/api/websocket.html


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

### (Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### v-for

(Technical description of the feature - 40ish words)
Render a list based on an array."item of list" is used, where "list" is the source data array and item is an alias for the array element being iterated on. 

(A code block snippet example demonstrating the feature)
```javascript
v-for="item of list"
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)
https://vuejs.org/guide/essentials/list


### Component v-model

(Technical description of the feature - 40ish words)


(A code block snippet example demonstrating the feature)
```javascript
v-model="item.user_id"
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### Client-Side Validations

(Technical description of the feature - 40ish words)
As with nearly every website, users will have a form where values will need to be inputted. This feature verifies that the value entered is correct. 

(A code block snippet example demonstrating the feature)

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)
