# Client Using Vue.js Framework

## Introduction
Welcome to the Client built using **Vue.js** framework in **Javascript** programming language.


## Relevant Files
* `index.html`
* `Dockerfile`
* `Makefile`

## Getting Started
* `$ git clone https://github.com/USERNAME/REPOSITORY`

### Requirements
* No Requirements

### Dockerfile
* To manually build the container, type into terminal: `$ docker build -t container-name-here .`
* To manually run client, type into terminal: `$ docker run -p 8001:8001 container-name-here`

### Makefile
* To build container and run the server, type into terminal: `$ make build run`

## Run Locally
* `$ cd "client-folder-name-here"`
* `$ python3 -m http.server 8001`

## Connecting Server to Client
* CRTL+C URL of server
* On end client URL, add `?api=`
* CRTL+V URL of server

* On client page URL should look like `*client URL*` + `?api=` + `*server URL*`

* `https://crispy-bassoon-p5rxqqw55xvhrpqg-8001.app.github.dev/`
* `?api=`
* `https://crispy-bassoon-p5rxqqw55xvhrpqg-8000.app.github.dev/`

## Report an Issue
* No issues, "perfect" program. Therefore, no report needed!

* Thank you!
