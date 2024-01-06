Technical Report
================
This technical report is to convey information in a clear, concise and easily accessible format about the frameworks used, what problems the frameworks used are trying to solve and what further recommendations could be made to improve the digital artifact. It is divided into sections detailing issues, features and recommendations of which frameworks are best to solve a given problem. Furthermore, issues found with both server and client frameworks showing the limits of each framework used are shown and elaborated on and features of said frameworks and the problem they are trying to solve are divulged with the benefits of a framework's features are stated. Recommendations of frameworks and why they should be used in regards to what the features of a framework do and what framework to use to avoid the stated issues.
(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### (name of Issue 1)

(A code snippet example demonstrating the issue)
```python
def serve_app(func_app, port, host=''):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        while True:
            s.listen()
            try:
                conn, addr = s.accept()
            except KeyboardInterrupt as ex:
                break
            with conn:
                #log.debug(f'Connected by ')
                #while True:
                    data = conn.recv(65535)  # If the request does not come though in a single recv/packet then this server will fail and will not composit multiple TCP packets. Sometimes the head and the body are sent in sequential packets. This happens when the system switches task under load.
                    #if not data: break
                    try:
                        request = parse_request(data)
                    except InvalidHTTPRequest as ex:
                        log.exception("InvalidHTTPRequest")
                        continue

                    # HACK: If we don't have a complete message - try to botch another recv - I feel dirty doing this 
                    # This probably wont work because utf8 decoded data will have a different content length 
                    # This needs more testing
                    while int(request.get('content-length', 0)) > len(request['body']):
                        request['body'] += conn.recv(65535).decode('utf8')

                    try:
                        response = func_app(request)
                    except Exception as ex:
                        log.error(request)
                        traceback.print_exc()
                        response = {'code': 500, 'body': f'<PRE>{traceback.format_exc()}</PRE>'}
                    # TODO: the code and content length do not work here - they are currently applied in encode response.
                    log.info(f"{addr} - {request.get('path')} - {response.get('code')} {response.get('Content-length')}")
                    conn.send(encode_response(response))
```
(Explain why this pattern is problematic - 40ish words)
The 'while True' loop in 'serve_app' blocks while waiting for a connection, processing it, and then moving on to the next one. This approach can lead to poor performance, especially in scenarios with a high volume of incoming requests.

### (name of Issue 2)

(A code snippet example demonstrating the issue)
```python
def parse_request(data):
    r"""
    >>> parse_request(b'GET /?key1=value1&key2=value2 HTTP/1.1\r\nHost: localhost:8000\r\nUser-Agent: curl/7.68.0\r\nAccept: */*\r\n\r\n')
    {'method': 'GET', 'path': '/', 'version': '1.1', 'query': {'key1': 'value1', 'key2': 'value2'}, 'host': 'localhost:8000', 'user-agent': 'curl/7.68.0', 'accept': '*/*', 'body': ''}
    >>> parse_request(b'Not a http request')
    Traceback (most recent call last):
    app.http_server.InvalidHTTPRequest: Not a http request
    """
    data = data.decode('utf8')
    match_header = RE_HTTP_HEADER.search(data)
    if not match_header:
        log.error(data)
        raise InvalidHTTPRequest(data)
    request = match_header.groupdict()
    request['query'] = {}
    path_query = request['path'].split('?', maxsplit=1)
    if (len(path_query) == 2):
        request['path'], request['query'] = path_query
        request['query'] = {k: '|'.join(v) for k,v in urllib.parse.parse_qs(request['query']).items()}
    for header in RE_HTTP_HEADER_KEY_VALUE.finditer(data):
        key, value = header.groupdict().values()
        request[key.lower()] = value
    request.update(RE_HTTP_BODY.search(data).groupdict())
    log.debug(request)
    return request
```
(Explain why this pattern is problematic - 40ish words)
The 'parse_request' function reads the incoming data using a single 'recv' call, which assumes that the entire HTTP request is contained in a single packet. This approach might lead to request smuggling vulnerabilities, especially if the application is deployed in a real-world scenario where requests can be fragmented across multiple packets.

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

### Request & Response 

(Technical description of the feature - 40ish words)
Falcon employs the inversion of control (IoC) pattern to coordinate with app methods in order to respond to HTTP requests. Resource responders, middleware methods, hooks, etc. receive a reference to the request and response objects that represent the current in-flight HTTP request.

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
minimize confusion and facilitate porting. 

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

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
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
