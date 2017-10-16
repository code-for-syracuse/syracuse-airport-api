## Running Syracuse Airport API in a Docker Container

You can find a Dockerfile in the ```docker``` directory. First, build the image:

```
~$ docker build -t {username}/syracuse-airport-api -f docker/Dockerfile .
```

Run it:

```
~$ docker run -p 49161:3000 -d {username}/syracuse-airport-api
```

You can can now access the container at ```http://{docker-ip}:49161```
