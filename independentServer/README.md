# Server Using Falcon Web Framework

## Introduction
* Welcome to the server built using the **Falcon** web framework in **python** programming language.
* open the `openapi.yaml` file for the specification

## Relevant Files
* `server.py`
* `client.html`
* `Dockerfile`
* `Makefile`

## Getting Started
* `$ git clone https://github.com/USERNAME/REPOSITORY`

### Requirements
* `$ pip install falcon`
* `$ pip instal falcon-cors`

### Dockerfile
* To manually build the container, type into terminal: `$ docker build -t container-name-here .`
* To manually run server, type into terminal: `$ docker run -p 8000:8000 container-name-here`

### Makefile
* To build container and run the server, type into terminal: `$ make build run`

## Run Locally
* `$ cd "server-folder-name-here"`
* `$ python *.py`

## Commands to use in terminal
* **Post To The Server** = `curl -X POST http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234", "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nails set. In canterbury", "lat": 51.2798438, "lon": 1.0830275}'`

* **Get All Items** = `$ curl -X GET http://localhost:8000/items`

* **Get By Item** = `$ curl -X GET http://localhost:8000/item/1`

* **Delete By Item** = `$ curl -X DELETE http://localhost:8000/item/1`

## Report an Issue
* Please report any issues you find, and we'll personally put them directly in bin!

* Thank you!
