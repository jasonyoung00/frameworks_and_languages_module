Technical Report
================
This technical report is to convey information in a clear, concise and easily accessible format about the frameworks used, what problems the frameworks used are trying to solve and what further recommendations could be made to improve the digital artifact. It is divided into sections detailing issues, features and recommendations of which frameworks are best to solve a given problem. Furthermore, issues found with both server and client frameworks showing the limits of each framework used are shown and elaborated on and features of said frameworks and the problem they are trying to solve are divulged with the benefits of a framework's features are stated. Recommendations of frameworks and why they should be used in regards to what the features of a framework do and what framework to use to avoid the stated issues.


Critique of Server/Client prototype
---------------------

### Overview
()why the example server/client is bad. why using framework instead will be good/better.
below are some issues with said prototype (example_server & example_client)

### Error Handling
```python
return {'code': 404, 'body': 'no route'}
```
If the incoming request does not match, the error message will always be a 404 regardless if it is or isn't. This will make bug fixing difficult/almost impossible as the developer will not have the necessary information about what is going wrong to fix said error.

### DOM Manipulation & State Management (Manuel)
```python

```
(Explain why this pattern is problematic - 40ish words)
makes the code less readable and maintainable

### Recommendation
(why the existing implementation should not be used - 40ish words)
these two are some of the many issues with the proto.

(suggested direction - frameworks 40ish words)
rebuild with frameworks (vuejs n falcon)

Server Framework Features
-------------------------

### Request & Response Objects
Falcon responds to HTTP requests by coordinating with app functions using the inversion of control (IoC) technique. The request and response objects that reflect the current in-flight HTTP request are referenced by resource responders, middleware methods, hooks, etc.
```python
def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        # get the file client.html and send it to the client page
        with open('client.html', 'r') as f:
            resp.body = f.read()
```
Falcon uses the request object to extract query parameters from the URL making it easy to access parameters passed in the query string. Furthermore, the response object allows developers to set appropriate status codes and error messages through the facilitation of error handling. Which is key when providing informative and consistent error responses making the process of bug fixing easier.
https://falcon.readthedocs.io/en/stable/api/request_and_response.html

### ASGI WebSocket Support
Persistent bidirectional communication is possible with Falcon's ASGI WebSocket support. WSGI however would make it so the WebSocket can only take one request at a time, the ASGI method overcomes this as it is bidirectional. It allows real time client updates and can be used when new information is made available. For example, on a store webpage when a product goes from being in-stock to out-of-stock and the users that are "listening" that area can be notified of the change through the WebSocket.
```python
async def on_websocket(self, req: Request, ws: WebSocket, account_id: str):
    pass
```
Although, while the proof of concept is applicable, the WebSocket might run into scalability issues as handling numerous concurrent connections will be difficult with python. Furthermore, using a different approach for applications that have a larger scale would be handled without as many concurrent connection problems.
https://falcon.readthedocs.io/en/stable/api/websocket.html

### Routing
Falcon has a strong routing engine that effectively links resources with URLs. As a result, developers can design expressive and understandable URL patterns for their API endpoints.
```python
app.add_route('/', home)
app.add_route('/item', post)
app.add_route('/items', getItems)
app.add_route('/item/{id}', getItem)
```
Falcon's routing system is built to be lightweight, scalable and efficient making it ideal for applications that require high throughput and low latency. In addition, the development process is streamlined as requests are stateless so all information that is to be processed is in the request. This puts the "workload" server-side, once the request has been sent, rather than on the client-side.
https://falcon.readthedocs.io/en/stable/api/routing.html

Server Language Features
-----------------------

### Libraries
The term "library" refers to a collection of modules, functions, and classes that provide pre-written and reusable code to perform specific tasks. Tasks in fields of Machine Learning, Data Science, Data Visualization, etc.
```python
import falcon
import json
import datetime
import random
```
It is a set of tools and resources that can be imported into a Python script or program, allowing leveraging of existing functionality without having to write everything from scratch. In addition, Libraries help in avoiding naming conflicts by encapsulating functionality within their own namespace. This prevents naming collisions with variables or functions within the code.
https://www.geeksforgeeks.org/libraries-in-python/

### Simple/Readable Syntax
Python's syntax is designed to be clear and readable, making it easy for developers to write and maintain code. Furthermore, it is accessible to beginners and promotes code readability and reduces the cost of program maintenance.
```python
print('Hello, World!')
```
Allows developers to express complex code in a clear and straightforward way. Developers can create complex, multi-protocol applications while maintaining concise, readable syntax. However, a downside would be that because python works off of indentation, if a line of code isn't indented properly then the whole program could fail.
https://ioflood.com/blog/python-for-beginners/
https://github.blog/2023-03-02-why-python-keeps-growing-explained/

Client Framework Features
-------------------------

### v-for
Render a list based on an array. The syntax "item in items" is used, where "items" is the source data array and "item" is an alias for the array element being iterated on.
```javascript
v-for="item of list"
```
In the code block, "of" is used as the delimiter instead of "in", so it is closer to JavaScript's syntax for iterators and "list" is the name of the source data. "v-for" can iterate over both arrays and objects. This flexibility is useful when working with different data structures. This useful as the data that is being inputted in the list is text and images.
https://vuejs.org/guide/essentials/list


### Component v-model
Used to create two-way data bindings on form inputs or custom components. When applied to a component, it allows you to use the "v-model" syntax to bind the component's data and update it in a parent component.
```javascript
v-model="item.user_id"
```
"v-model" allows for changes made in the child component's state are automatically reflected in the parent component and vice versa. As well as this, Using "v-model" enforces a convention where the prop passed to the child component is named value, and the event emitted to update the parent is named input. This makes the code more intuitive and easier to understand.
https://vuejs.org/guide/components/v-model.html

### Declarative Rendering
Declarative rendering in Vue.js simplifies the development process by allowing developers to focus on describing the desired UI state rather than manually manipulating the DOM. It emphasizes describing the structure and behavior of the UI based on the application's state.
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
Instead of imperatively instructing the browser on how to update the DOM in response to changes, developers using Vue.js declare what they want the UI to look like under different conditions, and Vue.js takes care of efficiently updating the DOM accordingly. 
https://www.geeksforgeeks.org/vue-js-declarative-rendering/

Client Language Features
------------------------

### Client-Side Validations
As with nearly every website, users will have a form where values will need to be inputted. This feature verifies that the value entered is correct. It is a technique used to validate user input on the client side before submitting the form to the server.
```javascript
if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        return false; // Prevent form submission
      }
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
It helps improve the user experience by providing instant feedback on input errors and reduces the need for unnecessary server requests.
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
Frameworks are recommended in software development for their ability to streamline and enhance the development process. They provide a structured and organized foundation, offering pre-established conventions and reusable components that significantly expedite application development. By enforcing best practices and design patterns, frameworks contribute to code consistency, reducing errors, and promoting maintainability. Collaboration among developers is facilitated as frameworks establish a common structure and coding standards, fostering a more efficient and cohesive team workflow.

Moreover, frameworks often come equipped with built-in functionalities, such as security features, testing tools, and database integrations, which not only save development time but also ensure that applications adhere to industry standards. The abstraction of common tasks allows developers to focus on business logic rather than routine implementations. As a result, frameworks contribute to the creation of robust, scalable, and feature-rich applications. Whether it's web development, mobile app development, or other domains, frameworks provide a reliable and proven foundation, empowering developers to build high-quality software with reduced effort, increased productivity, and improved code maintainability.

(justify which frameworks should be used and why 180ish words)
Falcon's lightweight design ensures rapid development, making it an ideal choice for projects where performance is critical. Its efficient routing system enables the creation of RESTful APIs with minimal overhead, ensuring low latency and optimal resource utilisation. As well as this, Falcon promotes a resource-oriented architecture, making it easy to structure code around RESTful principles. The framework's simplicity and intuitive syntax contribute to code readability, reducing the learning curve for developers. With a focus on minimalism, Falcon allows for precise control over the request-response lifecycle, enabling developers to fine-tune the said API's behavior.

Furthermore, Vuejs's simplicity and ease of integration make it an ideal framework for building interactive and dynamic user interfaces. Vue.js follows a component-based architecture, promoting modular development, code reuse, and easy maintenance. The framework's reactivity system ensures efficient updates to the UI based on changes in data, simplifying state management and enhancing the overall developer experience. Vue.js prides itself excellent performance, thanks to its optimized rendering process and a virtual DOM that minimizes unnecessary updates. Its flexibility enables seamless integration with existing projects, making it a pragmatic choice for incremental adoption. With a robust ecosystem, including Vue Router for navigation and Vuex for state management, Vue.js empowers developers to build scalable and feature-rich applications. Overall, Vue.js strikes a balance between simplicity, flexibility, and performance, making it a preferred framework for modern web development.
