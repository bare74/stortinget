<div id="header" align="center">
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>
</div>

# Api Stortinget

## Description

_This is a tracking system for Stortinget to build an API to support that the system will integrate between when items are added to the API and stored on cardID. With several endpoints See documentation under_

## HTTP Methods

- _GET - Requests retrieve resource information_
- _POST - The server creates a new entry in a database_
- _DELETE - Deletes resource_

|     Name     | Request type |                            Endpoint                            |                                   Body                                    |
| :----------: | :----------: | :------------------------------------------------------------: | :-----------------------------------------------------------------------: |
|   Get All    |    `GET`     |                     http://localhost:8080                      |                                                                           |
|              |              |                             ITEMS                              |                                                                           |
|  Add Items   |    `POST`    |                  http://localhost:8080/items                   |           { name:"string", category:"string", price:"number" }            |
|  Get Items   |    `GET`     |                  http://localhost:8080/items                   |                                                                           |
|              |              |                              CARD                              |                                                                           |
|   Add Card   |    `POST`    |                   http://localhost:8080/card                   | { card_number:"number", store: "string", adress:"string", date:"string" } |
|   Get Card   |    `GET`     |            http://localhost:8080/card/:card_number             |                                                                           |
|              |              |                     Card number/date/items                     |                                                                           |
|   Get Data   |    `GET`     |                http://localhost:8080/day/:date                 |                                                                           |
|   Get Data   |    `GET`     |     http://localhost:8080/month/:month_number/:year_number     |                                                                           |
|              |              |                             STORE                              |                                                                           |
|   Get Data   |    `GET`     |               http://localhost:8080/store/:store               |                                                                           |
|              |              |                      Delete ALL data card                      |                                                                           |
| Delete Data  |   `DELETE`   |            http://localhost:8080/card/:card_number             |                                                                           |
|              |              |                  CREATE / DROP / RESET TABLE                   |                                                                           |
| Create table |    `GET`     |                  http://localhost:8080/create                  |                                                                           |
|  Drop table  |    `GET`     |                   http://localhost:8080/drop                   |                                                                           |
| Reset table  |    `GET`     | http://localhost:8080/reset (drop and insert data to database) |                                                                           |

## Setup/Installation Requirements

- _Mkdir «foldername»_
- _touch «.gitignore» www.gitignore.io_
- _touch app.js_
- _git init_
- _npm init_
- _npm install_
- _npm install morgan_
- _npm install body-parser_
- _npm install express_
- _npm install sqlite3_
- _npm install nodemon_

- _npm init - is a convenient way of scaffolding your package json you may need to run it everytime you are starting a new project_

- _npm install - installs your dependencies in node modules folder. You may need to run this everytime you manually add a dependency to your package_

- _Morgan - This is a great tool that logs the requests along with some other information depending upon its configuration and the preset used. It proves to be very helpful while debugging and also if you want to create Log files_

- _Body-parser - Responsible for parsing the incoming request bodies in a middleware before you handle it, that usually helps when you need to know more than just the URL being hit_

- _Express - It is used to build a single page, multipage, and hybrid web application helps us complete these transactions by helpfully augmenting the built in Request and Response objects that the Node. js core http module provides when a request is received by your server_

- _sqlite3 - is a relational database. The details related to a database is stored in a file. Copying a database from one machine to another is just a file with no complex commands or anything_

- _nodemon - is a tool that helps develop Node. js based applications by automatically restarting the node application when file changes in the directory are detected_

- _In the package.json file you can change the "scripts" to : {"start": "node app.js"} then you can run nodemon in the server and the server is up and running_

## Contact Information

_Bjørn Nielsen_
