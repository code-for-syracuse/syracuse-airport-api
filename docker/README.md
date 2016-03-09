## Running OC Elections API in a Docker Container

You can find a Dockerfile in the ```docker``` directory. Fisrt, build the image:

```
~$ docker build -t {username}/oc-election-api -f docker/Dockerfile .
```

Run it:

```
~$ docker run -p 49161:3000 -d {username}/oc-elections-api
```

You can can now access the container at ```http://{docker-ip}:49161```
