# Dockerizing an Angular Application with Backend and Frontend
This project aims to dockerize a complete application developed with Angular, which includes both the frontend and the backend with a MongoDB database.

## Project Structure 
The project is structured as follows:

- Backend: The server-side is developed using Node.js with Express.js as the framework. It establishes a connection with a MongoDB database to store and manage data.

- Frontend: The client-side is developed using Angular.

### Objectives
The main goal is to containerize both the backend and the frontend to simplify the deployment and implementation of the application in any Docker-compatible environment.
##### Technologies Used
- Backend:
Node.js
MongoDB (database)

- Frontend
Angular

- Docker
We will use Docker to containerize both the backend and frontend, ensuring portability and ease of deployment.
#### Project Creation


![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/1.png)

A Dockerfile is created for both the backend and frontend parts, where each configuration is detailed within the Dockerfile.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/2.png)

The creation of a Dockerfile by stage refers to a process of building and organizing Docker containers in various stages within a configuration file called frontend.dockerfile in this case.

What this achieves is optimization of Docker image creation, significantly reducing the space it occupies on a server and providing benefits such as cost reduction from the hosting provider where our Docker image is deployed.

At this point, the decision remaining is whether to use docker run or docker-compose to launch both containers. Here, I will demonstrate each scenario, starting with the 'manual' approach as described in this section.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/3.png)


From here, we create the image based on the dockerfile.backend.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/4.png)

One of the features here is the need to create a network where both containers can listen and exchange information. Without this network, the containers wouldn't be able to communicate.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/5.png)

Therefore, it is created using the command shown earlier or the one observed in the image

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/6.png)

Once the network is created, we use a docker run command to spin up the project locally. However, if we take a closer look, there are many commands involved which, in my opinion, can lead to errors. That's why it's not my preferred way to launch a container.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/7.png)

Finally, now we can see that our first backend container is up and running. Next, let's proceed with the frontend.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/8.png)

For the frontend, our docker run command is a bit shorter, but we still need to execute this command every time we want to start our project. I emphasize that this is done manually and not automated, which is not ideal when working on more complex projects.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/10.png)

Something very important that I forgot to mention is the nginx configuration file, which I included in the Dockerfile described earlier.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/9.png)

We can see that both containers are running and are part of the same network, allowing them to exchange information.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/13.png)

It can be observed that everything is working with this first scenario

### Now let´s use Docker Compose.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/14.png)


For the second scenario, we can say that we are using an "automated" way to start our project. For this purpose, we create a Docker Compose file that allows us to write each of the commands used in scenario one but with the convenience of having everything included in a single file, as shown in the image.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/15.png)

Once the Docker Compose file for launching the project is written, all that's needed is to run the following command:

   docker comose up -d --build

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/16.png)


Finally, we observe that both containers are up and running.

![](https://github.com/rockstban/Angular-with-Docker/blob/main/backend/Imagenes%20Angular/17.png)


Here we can see that they are running on the ports specified in the Docker Compose file

## Commands you can use to start the project from home.

### If you use docker run

1. All the commands for 'docker run'

   ```bash
   docker build -t angular-backend:1.0.0 .
   docker network ls
   docker network create angular-network
   docker run -d -p 3600:3600 --network angular-network -v C:your_path:/app -v /app/node_modules -e DATABASE="your_data_base" angular-backend:1.0.0
### If you use docker compose 

2. All the commands for 'docker compose'

   ```bash
   docker compose up -d --build frontend
## Watch the video step by step 

Thank you for being here. I hope to help you. If you're interested, you can watch the following video where I explain this process more thoroughly

[Click here to watch the video tutorial!!](https://youtu.be/86PiRMAcVO8)
   

   



