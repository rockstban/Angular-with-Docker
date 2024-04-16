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


![](https://private-user-images.githubusercontent.com/129819154/322939689-93f4da92-f600-4ae6-a384-07574459ef65.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyODk5NTgsIm5iZiI6MTcxMzI4OTY1OCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5Njg5LTkzZjRkYTkyLWY2MDAtNGFlNi1hMzg0LTA3NTc0NDU5ZWY2NS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzQ3MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNzc1OWNhZjNlNTYyNGQ0YTU4ZmYzYzEyYWJkZDJkNmZlMGY4OTBmYzY4OGNkYzE5YTExMTA2ODZiYjBiMTBhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.W8rJDfBpmr-NKrpfpAzKIFnRnvJtEU4dZ8wLHorxJAw)

A Dockerfile is created for both the backend and frontend parts, where each configuration is detailed within the Dockerfile.

![](https://private-user-images.githubusercontent.com/129819154/322939696-3ea38073-fdde-48f8-ad56-3358b14e1767.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyODk5NTgsIm5iZiI6MTcxMzI4OTY1OCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5Njk2LTNlYTM4MDczLWZkZGUtNDhmOC1hZDU2LTMzNThiMTRlMTc2Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzQ3MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zYWRmYTMzODc2MTExNzFhZWY5ZjE4MjQ1NmFiY2E5MGI0Yjg0NGQzNGIyOWQxMmZhMDg0MWY2ZjNmZTY2NTA1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.o42umyTfLW7jF97QNvQwvztj_rmllSyLbWFEWBrAtNw)

The creation of a Dockerfile by stage refers to a process of building and organizing Docker containers in various stages within a configuration file called frontend.dockerfile in this case.

What this achieves is optimization of Docker image creation, significantly reducing the space it occupies on a server and providing benefits such as cost reduction from the hosting provider where our Docker image is deployed.

At this point, the decision remaining is whether to use docker run or docker-compose to launch both containers. Here, I will demonstrate each scenario, starting with the 'manual' approach as described in this section.

![](https://private-user-images.githubusercontent.com/129819154/322939699-342f54c6-14b6-4a56-915b-73f7d2a0570f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyODk5NTgsIm5iZiI6MTcxMzI4OTY1OCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5Njk5LTM0MmY1NGM2LTE0YjYtNGE1Ni05MTViLTczZjdkMmEwNTcwZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzQ3MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mOTNkZjQ2ODY0NWYyOThiOWRhYmZjODdiZGJiOGM1YzJiMjIzZDRjNTA3Y2IxMjI1NGRkMGVhNmE2ZDdkMGFhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.hZ00HVRs0PYOhrqDKguHrpVopxuc9yKJ8sC3_3J5vUo)


From here, we create the image based on the dockerfile.backend.

![](https://private-user-images.githubusercontent.com/129819154/322939701-b1ad6a4f-79a3-4001-b7e6-fcd04f5a22b8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTAyODQsIm5iZiI6MTcxMzI4OTk4NCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzAxLWIxYWQ2YTRmLTc5YTMtNDAwMS1iN2U2LWZjZDA0ZjVhMjJiOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzUzMDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mZDlhNTIxNjRkNDA3NGVmYzU1Yjc3N2ZmNDQxMDhlY2M1ZDE3ODQ0NTU5YjY2YjMxYmU3MzliMWU1Mzg5YzY4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.n2mYBhPFmgBZ8MaNQS456WduoQzsk22mwMypo-DP_xc)

One of the features here is the need to create a network where both containers can listen and exchange information. Without this network, the containers wouldn't be able to communicate.

![](https://private-user-images.githubusercontent.com/129819154/322939704-23bf8591-48bb-4e5f-a154-57b80941ca44.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTAyODQsIm5iZiI6MTcxMzI4OTk4NCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzA0LTIzYmY4NTkxLTQ4YmItNGU1Zi1hMTU0LTU3YjgwOTQxY2E0NC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzUzMDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kZDliNjg0ZWY5N2I3MDc5ZWQ1ZDRhMDAyODBiODRiMWIxNzYxNzJlODI1MjJlZGRmNWNlZjQ3ZTE2MDA1OTE0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.PmvafjvCXdDIUxKD09bVCD0MywEC-LrJWw1_QW4rR-8)

Therefore, it is created using the command shown earlier or the one observed in the image

![](https://private-user-images.githubusercontent.com/129819154/322939707-9c491f40-d4fc-4946-b05f-242cd8df6365.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTAyODQsIm5iZiI6MTcxMzI4OTk4NCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzA3LTljNDkxZjQwLWQ0ZmMtNDk0Ni1iMDVmLTI0MmNkOGRmNjM2NS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzUzMDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jZDMwMjA2NGUzMzI5ZTJiODQ2OGY3MGRkN2Q2MWNmZWQyNjBhYmE1MjhjZDlkNGM0ODBlOGY3ZDEyMmRlNDA0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.j3q3gsUZ3kvyebU4TjUMnuGZoZAUPRrUvCUXwhDW6q8)

Once the network is created, we use a docker run command to spin up the project locally. However, if we take a closer look, there are many commands involved which, in my opinion, can lead to errors. That's why it's not my preferred way to launch a container.

![](https://private-user-images.githubusercontent.com/129819154/322939710-01d09c87-a14d-4c85-a4a6-37741fc29555.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTAyODQsIm5iZiI6MTcxMzI4OTk4NCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzEwLTAxZDA5Yzg3LWExNGQtNGM4NS1hNGE2LTM3NzQxZmMyOTU1NS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzUzMDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05MjZhYjM3MDIzYWNjMGUwNTc3NTk0MDI5NmRlM2JhYjlkZjBlYjc0NDI0ODA4M2FlM2Y2ZDZmYjBjODQ5NzU0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.bm6y5C-yoGIK2Oegq4ezFGsw976WGXSJ8sukTFmJ4bY)

Finally, now we can see that our first backend container is up and running. Next, let's proceed with the frontend.

![](https://private-user-images.githubusercontent.com/129819154/322939712-66c84194-3d7c-406d-bf81-09bd6d335413.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTA2MjcsIm5iZiI6MTcxMzI5MDMyNywicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzEyLTY2Yzg0MTk0LTNkN2MtNDA2ZC1iZjgxLTA5YmQ2ZDMzNTQxMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzU4NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02YWNjNDMwNDIzMGNiMjYxMzdjYmI4MTJkNTExZjdhNGZhNmE3ZWYwOWIxODBmZmMxNzRmOTg3MzE3NzhkZTA3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.ZjaCXWVRuHD6StI47QpRxN9k5xBzF8n0EEs3sNzjahY)

For the frontend, our docker run command is a bit shorter, but we still need to execute this command every time we want to start our project. I emphasize that this is done manually and not automated, which is not ideal when working on more complex projects.

![](https://private-user-images.githubusercontent.com/129819154/322939720-7df77aec-c6e7-4b55-bd37-3cc8abffcbb6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTA2MjcsIm5iZiI6MTcxMzI5MDMyNywicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzIwLTdkZjc3YWVjLWM2ZTctNGI1NS1iZDM3LTNjYzhhYmZmY2JiNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzU4NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01ZDhmZmEyZTQ5NDIyZmQ4NTIyNjA3ZmQyZDNjMGE5ZWEzNTRkZDZjMGEzZDAyYWQ5Y2YxMjk5NGJjODA4OGU4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.uKqZT0qir_oSZW4qZEOQfL7zvBmmbp2QaaoeHHWgyZA)

Something very important that I forgot to mention is the nginx configuration file, which I included in the Dockerfile described earlier.

![](https://private-user-images.githubusercontent.com/129819154/322939717-abe7775a-1510-4648-9937-ac40bf0208c8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTA2MjcsIm5iZiI6MTcxMzI5MDMyNywicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzE3LWFiZTc3NzVhLTE1MTAtNDY0OC05OTM3LWFjNDBiZjAyMDhjOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzU4NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yMTkzNzMwNTg5YzcxM2VmNTdmYTMwMmNiYTk4ZTQ2ZGVjYTk4ZDUzMzk5NTk0YWE5NTE3ZTY5MDgzM2Q5NjFlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.iNm9R6pqRoUoATJWEPuSMtZNnvVoz254Cc0qZ33XPxk)

We can see that both containers are running and are part of the same network, allowing them to exchange information.

![](https://private-user-images.githubusercontent.com/129819154/322939733-8c25b902-b5f1-4ab8-b809-f72cc2c17d43.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTA2MjcsIm5iZiI6MTcxMzI5MDMyNywicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzMzLThjMjViOTAyLWI1ZjEtNGFiOC1iODA5LWY3MmNjMmMxN2Q0My5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNzU4NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kZDY1YmIwNWM4N2ZhZjM4YzJjZGQ1YzhkYjM3M2FmZTcyNDMyN2E0OWUwZjVkMjdjOTNkNjA4ZWVmYzJhZWFkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.dN6s1mjn-izSEYEF3qleiLKDIi1DHmpM1e2gwNfl84o)

It can be observed that everything is working with this first scenario

### Now let´s use Docker Compose.

![](https://private-user-images.githubusercontent.com/129819154/322939739-cd6b03eb-dbbe-4a68-a7c8-782cf659d278.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTA5NTgsIm5iZiI6MTcxMzI5MDY1OCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzM5LWNkNmIwM2ViLWRiYmUtNGE2OC1hN2M4LTc4MmNmNjU5ZDI3OC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxODA0MThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01MWY5NjUxZTZlYzFmZWFmYzEzOTE4ZmViMzk1Yjk0MWQ2Zjk5MzJkZWE4ODE5MzBmNWVkNWQ3OWZiMjhhNTBhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.2PE6swkr66d-dS_zldIAd5AHw_nTZF-kZvRBGb5kNrM)


For the second scenario, we can say that we are using an "automated" way to start our project. For this purpose, we create a Docker Compose file that allows us to write each of the commands used in scenario one but with the convenience of having everything included in a single file, as shown in the image.

![](https://private-user-images.githubusercontent.com/129819154/322939743-bf3e7f68-fdd0-4f4a-b8b6-d08d9b427281.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTA5NTgsIm5iZiI6MTcxMzI5MDY1OCwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzQzLWJmM2U3ZjY4LWZkZDAtNGY0YS1iOGI2LWQwOGQ5YjQyNzI4MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxODA0MThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01YTk5YzU4NTY5OTY3ZTIzMTdlZWQzZWUxM2I5YmQzZTQ3ZWE4YzYyNmQ4N2EyN2Y4YTQ5NDJhZDc0NTNhNmFlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.vqXXbw0Bq6jn9Opev0l9EbIrKJAYwILKYYdOt6c_y5Y)

Once the Docker Compose file for launching the project is written, all that's needed is to run the following command:

   docker comose up -d --build

![](https://private-user-images.githubusercontent.com/129819154/322939744-c5ef14e7-1b91-46cf-95fa-6b8b26db643d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTEzMTEsIm5iZiI6MTcxMzI5MTAxMSwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzQ0LWM1ZWYxNGU3LTFiOTEtNDZjZi05NWZhLTZiOGIyNmRiNjQzZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxODEwMTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNjEwY2IwNzhlM2ZiNmM0YTZhZDE1ZjBlYzAwZTY4NmM5OTNjMDZiOTEyMzQ4MGFkYzBlMjkzMDk1YTI2MDc0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.66y1AVy_0HzeOGYTPql484fiCF92CqDha7PZVlbnkM0)


Finally, we observe that both containers are up and running.

![](https://private-user-images.githubusercontent.com/129819154/322939748-c08dcbad-9da3-424a-9158-3995a2895786.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyOTEzMTEsIm5iZiI6MTcxMzI5MTAxMSwicGF0aCI6Ii8xMjk4MTkxNTQvMzIyOTM5NzQ4LWMwOGRjYmFkLTlkYTMtNDI0YS05MTU4LTM5OTVhMjg5NTc4Ni5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxODEwMTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lOTAwYjQ0MmU5YThjNjc4NjVlMTczYWE1NGIxNDZhMWFhNDlmZDgwZjI5MDNmZGYzODEzZmYwOTE0N2U0NzNiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.ZjAGyKKY9YXTD2QtzA17r-7rEN3DJbtdy_eighI3M_w)


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
   

   


