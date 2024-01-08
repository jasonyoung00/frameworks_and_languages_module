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
Falcon uses the request object to extract query parameters from the URL making it easy to access parameters passed in the query string. Furthermore, the response object allows developers to set appropriate status codes and error messages through the facilitation of error handling. Which is key when providing informative and consistent error responses making the process of bug fixing easier.

(Provide reference urls to your sources of information about the feature - required)
https://falcon.readthedocs.io/en/stable/api/request_and_response.html

### ASGI WebSocket Support
(Technical description of the feature - 40ish words)
Persistent bidirectional communication is possible with Falcon's ASGI WebSocket support. WSGI however would make it so the WebSocket can only take one request at a time, the ASGI method overcomes this as it is bidirectional. It allows real time client updates and can be used when new information is made available. For example, on a store webpage when a product goes from being in-stock to out-of-stock and the users that are "listening" that area can be notified of the change through the WebSocket.

(A code block snippet example demonstrating the feature)
```python
async def on_websocket(self, req: Request, ws: WebSocket, account_id: str):
    pass
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
Although, while the proof of concept is applicable, the WebSocket might run into scalability issues as handling numerous concurrent connections will be difficult with python. Furthermore, using a different approach for applications that have a larger scale would be handled without as many concurrent connection problems.

(Provide reference urls to your sources of information about the feature - required)
https://falcon.readthedocs.io/en/stable/api/websocket.html

### Routing
(Technical description of the feature - 40ish words)
Falcon has a strong routing engine that effectively links resources with URLs. As a result, developers can design expressive and understandable URL patterns for their API endpoints.
(A code block snippet example demonstrating the feature)
```python
app.add_route('/', home)
app.add_route('/item', post)
app.add_route('/items', getItems)
app.add_route('/item/{id}', getItem)
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
Falcon's routing system is built to be lightweight, scalable and efficient making it ideal for applications that require high throughput and low latency. In addition, the development process is streamlined as requests are stateless so all information that is to be processed is in the request. This puts the "workload" server-side, once the request has been sent, rather than on the client-side.

(Provide reference urls to your sources of information about the feature - required)
https://falcon.readthedocs.io/en/stable/api/routing.html

Server Language Features
-----------------------

### Libraries
(Technical description of the feature - 40ish words)
The term "library" refers to a collection of modules, functions, and classes that provide pre-written and reusable code to perform specific tasks. Tasks in fields of Machine Learning, Data Science, Data Visualization, etc.

(A code block snippet example demonstrating the feature)
```python
import falcon
import json
import datetime
import random
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
It is a set of tools and resources that can be imported into a Python script or program, allowing leveraging of existing functionality without having to write everything from scratch. In addition, Libraries help in avoiding naming conflicts by encapsulating functionality within their own namespace. This prevents naming collisions with variables or functions within the code.

(Provide reference urls to your sources of information about the feature - required)
https://www.geeksforgeeks.org/libraries-in-python/

### Simple/Readable Syntax
(Technical description of the feature - 40ish words)
Python's syntax is designed to be clear and readable, making it easy for developers to write and maintain code. Furthermore, it is accessible to beginners and promotes code readability and reduces the cost of program maintenance.

(A code block snippet example demonstrating the feature)
```python
print('Hello, World!')
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
Allows developers to express complex code in a clear and straightforward way. Developers can create complex, multi-protocol applications while maintaining concise, readable syntax. However, a downside would be that because python works off of indentation, if a line of code isn't indented properly then the whole program could fail.

(Provide reference urls to your sources of information about the feature - required)
https://ioflood.com/blog/python-for-beginners/
https://github.blog/2023-03-02-why-python-keeps-growing-explained/

Client Framework Features
-------------------------

### v-for
(Technical description of the feature - 40ish words)
Render a list based on an array. The syntax "item in items" is used, where "items" is the source data array and "item" is an alias for the array element being iterated on.

(A code block snippet example demonstrating the feature)
```javascript
v-for="item of list"
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
In the code block, "of" is used as the delimiter instead of "in", so it is closer to JavaScript's syntax for iterators and "list" is the name of the source data. "v-for" can iterate over both arrays and objects. This flexibility is useful when working with different data structures. This useful as the data that is being inputted in the list is text and images.

(Provide reference urls to your sources of information about the feature - required)
https://vuejs.org/guide/essentials/list


### Component v-model
(Technical description of the feature - 40ish words)
Used to create two-way data bindings on form inputs or custom components. When applied to a component, it allows you to use the "v-model" syntax to bind the component's data and update it in a parent component.

(A code block snippet example demonstrating the feature)
```javascript
v-model="item.user_id"
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
"v-model" allows for changes made in the child component's state are automatically reflected in the parent component and vice versa. As well as this, Using "v-model" enforces a convention where the prop passed to the child component is named value, and the event emitted to update the parent is named input. This makes the code more intuitive and easier to understand.

(Provide reference urls to your sources of information about the feature - required)
https://vuejs.org/guide/components/v-model.html

### Declarative Rendering
(Technical description of the feature - 40ish words)
Declarative rendering in Vue.js simplifies the development process by allowing developers to focus on describing the desired UI state rather than manually manipulating the DOM. It emphasizes describing the structure and behavior of the UI based on the application's state.

(A code block snippet example demonstrating the feature)
```javascript
const parent = new Vue({ 
    el : '#parent', 
    data : { 
      
        // The data that will be 
        // interpolated in the DOM 
        priority1: "vue.js", 
        priority2: "React.js", 
        priority3: "Angular.js"
    } 
})
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
Instead of imperatively instructing the browser on how to update the DOM in response to changes, developers using Vue.js declare what they want the UI to look like under different conditions, and Vue.js takes care of efficiently updating the DOM accordingly. 

(Provide reference urls to your sources of information about the feature - required)
https://www.geeksforgeeks.org/vue-js-declarative-rendering/

Client Language Features
------------------------

### Client-Side Validations
(Technical description of the feature - 40ish words)
As with nearly every website, users will have a form where values will need to be inputted. This feature verifies that the value entered is correct. It is a technique used to validate user input on the client side before submitting the form to the server.

(A code block snippet example demonstrating the feature)
```javascript
if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        return false; // Prevent form submission
      }
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
It helps improve the user experience by providing instant feedback on input errors and reduces the need for unnecessary server requests.

(Provide reference urls to your sources of information about the feature - required)
https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

### Dynamic Typing
(Technical description of the feature - 40ish words)
Dynamic typing in JavaScript refers to the ability of variables to hold values of any data type without explicitly declaring their type.

(A code block snippet example demonstrating the feature)
```javascript

```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)


(Provide reference urls to your sources of information about the feature - required)
https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing

Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)
