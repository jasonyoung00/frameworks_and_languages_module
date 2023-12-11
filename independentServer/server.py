from wsgiref.simple_server import make_server

import falcon
import json
import datetime
import random

class StaticResource(object):
    def on_get(self, req, resp, filename):
        # do some sanity check on the filename
        resp.status = falcon.HTTP_200
        resp.content_type = 'appropriate/content-type'
        with open('client.html', 'r') as f:
            resp.body = f.read()

# example data. will display up when client/server is running
Items = [
    {
        "id": 0,
        "user_id": "user1234",
        "keywords":
        [
            "hammer",
            "nails",
            "tools"
        ],
        "description": "A hammer and nails set",
        "image": "http://placekitten.com/100/100",
        "lat": 51.2798438,
        "lon": 1.0830275,
        "date_from": "2023-10-23T13:13:05.200Z",
        "date_to": "2023-10-23T13:13:05.200Z"
    }
]

class PostItemResource:
    #  https://stackoverflow.com/a/57034336
    def on_post(self, req, resp):
        # get the request's body, reads it, then decodes it
        jsonData = json.loads(req.bounded_stream.read().decode('utf-8'))
         
         # validates the inputs, if any fields are missing then 405 Method Not Allowed
        if jsonData.get("user_id") is None or jsonData.get("lat") is None or jsonData.get("lon") is None or jsonData.get("keywords") is None or jsonData.get("description") is None:
            resp.status = falcon.HTTP_405 # comm
            # https://falcon.readthedocs.io/en/stable/user/quickstart.html#learning-by-example
            resp.text = ("405 Method Not Allowed")
        else:
             # https://docs.python.org/3/library/datetime.html # comm
            dateTo = datetime.datetime.now().isoformat()
            dateFrom = datetime.datetime.now().isoformat()

            #comm
            inputFields = {
                # generates random integer between 0 and 999 and then timed by another random integer thats between 0 and 999
                "id": (random.randint(1, 999) * random.randint(1, 999)),
                "user_id": jsonData.get("user_id"),
                "lat": jsonData.get("lat"),
                "lon": jsonData.get("lon"),
                "image": jsonData.get("image"),
                "keywords": jsonData.get("keywords"),
                "description": jsonData.get("description"),
                "date_from": dateFrom,
                "date_to": dateTo,
            }
            
            resp.media = inputFields #comm
            Items.append(inputFields) # https://www.interviewkickstart.com/learn/the-append-function-in-python#:~:text=The%20append()%20function%20in%20Python%20takes%20a%20single%20item,the%20end%20of%20the%20list
            resp.status = falcon.HTTP_201 #
            #resp.text = ("201 Created")

class GetItemsResource:
    def on_get(self, req, resp):

        resp.media = Items
        resp.status = falcon.HTTP_200

class GetItemResource:
    def on_get(self, req, resp, id):
        idOfItem = int(id)

        for i in Items:
            if i['id'] == idOfItem:
                resp.media = i
                resp.status = falcon.HTTP_200
                break
            else:
                resp.status = falcon.HTTP_404
                resp.media = ("404 Not Found")

    def on_delete(self, req, resp, id):
        idOfItem = int(id)

        # https://www.geeksforgeeks.org/enumerate-in-python/
        # https://stackoverflow.com/a/51403623
        for index, item in enumerate(Items):
            if item['id'] == idOfItem:
                q = index
                break
        if q == None:
            resp.status = falcon.HTTP_404
            resp.media = ("404 Not Found")
        else:
            # https://www.mygreatlearning.com/blog/remove-item-from-list-python/#:~:text=remove()%3A%20remove()%20is,to%20remove%20from%20the%20list_name
            Items.pop(q)
            resp.status = falcon.HTTP_204


# falcon.App instances are callable WSGI apps
# in larger applications the app is created in a separate file
app = falcon.App()

# Resources are represented by long-lived class instances
home = StaticResource()
post = PostItemResource()
getItems = GetItemsResource()
getItem = GetItemResource()

# things will handle all requests to the '/things' URL path
app.add_route('/', home)
app.add_route('/item', post)
app.add_route('/items', getItems)
app.add_route('/item/{id}', getItem)

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()