DOCKER_IMAGE:=server

run_local:
    python server.py

build:
    docker build --tag independentServer .

run:
	docker run --rm --publish 8000:8000 independentServer