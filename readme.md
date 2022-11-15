# _Api_Stortinget_

## Description

_This is a tracking system for Stortinget to build an API to support that the system will integrate between when items are added to the API and stored on cardID. See documentation under_

## HTTP Methods

- _GET - Requests retrieve resource information_
- _POST - The server creates a new entry in a database_
- _DELETE - Deletes resource_

| Name         | Request type | Endpoint                                                       | Body                                                                      |
| ------------ | ------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Get All      | GET          | http://localhost:8080                                          |                                                                           |
|              |              | ITEMS                                                          |                                                                           |
| Add Items    | POST         | http://localhost:8080/items                                    | { item:"string", value:"string", currency:"string", price:"number" }      |
| Get Items    | GET          | http://localhost:8080/items                                    |                                                                           |
|              |              | CARD                                                           |                                                                           |
| Add Card     | POST         | http://localhost:8080/card                                     | { card_number:"number", store: "string", adress:"string", date:"string" } |
| Get Card     | GET          | http://localhost:8080/card/:card_number                        |                                                                           |
|              |              | Card number/date/items                                         |                                                                           |
| Get Data     | GET          | http://localhost:8080/day/:date                                |                                                                           |
| Get Data     | GET          | http://localhost:8080/month/:month_number/:year_number         |                                                                           |
|              |              | Delete ALL data card                                           |                                                                           |
| Delete Data  | DELETE       | http://localhost:8080/card/:card_number                        |                                                                           |
|              |              | CREATE / DROP / RESET TABLE                                    |                                                                           |
| Create table | GET          | http://localhost:8080/create                                   |                                                                           |
| Drop table   | GET          | http://localhost:8080/drop                                     |                                                                           |
| Reset table  | GET          | http://localhost:8080/reset (drop and insert data to database) |                                                                           |

## Setup/Installation Requirements

- _Mkdir «foldername»_
- _touch «.gitignore» www.gitignore.io_
- _npm init_
- _npm install_
- _npm install body-parser_
- _npm install path_
- _npm install express_
- _npm install morgan_
- _npm install nodemon_
- _npm install sqlite3_

## Contact Information

_Bjørn Are Nielsen - Github: ctc301_
