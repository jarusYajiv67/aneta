# Aneta
### Resources and Project management tool

##### 3 min pitch video - https://www.youtube.com/watch?v=trwPCOCY71Y
##### Aneta is available at - https://its-me-sv.github.io/aneta/

#### Table of contents (with TTR)
##### 1. Setup and Usage
##### 2. Tech Summary (2 min 43 secs)
##### 3. Business (28 secs)

### Setup and Usage:
#### Frontend
``` 
1. cd aneta
2. Update defaultState in aneta/src/contexts/api.context.tsx
3. npm install
4. npm start
```
#### Database
```
1. Create a database in Astra DB
2. Run all the queries from aneta-server/queries.cql in your database's CQLSH
```
#### Backend
```
1. cd aneta-server
2. Update the .env file
3. npm install
4. npm start or npm run dev (requires nodemon to be installed)
```

### Tech Summary:
#### 🗄️ Database
Organisations table stores the organisation's details and credentials. Apart from that it has the
column profile_picture where the organisation manager can put their image. Using status(integer) column we can identify whether the person is online(2) or offline(0) or away(1)

Employee table stores the employe's details and credentials. It also stores the name of the organisation to which the employee is working. Using joined(boolean) column we can find whether the employee has been hired or not. With that we can also render the frontend accordingly to the employee/candidate. Leaves(integer) column keeps track of the leaves taken by the employee. Projects(set[text]) column holds the list of all the projects the employee worked/working on. With the help of request(boolean) column, we can get to know whether the employee has requested for leave or not. Role(text) column denotes the role(Developer, Tester, Support, Project Manager) of the employee in the organisation. Skills(set[text]) column holds the skills of the employee.
Status column is similar like in Organisations table

![](https://github.com/jarusYajiv67/aneta/blob/main/db.PNG)

Projects table stores the details of a project from an specific organisation. Resources(set[text]) column holds the email of all the employee who are working/worked on the project. Status(integer) column is similar to those from Organisations and Employee table, but with a slight difference. Here, using status we find whether the project is active(1) or parked(0) or completed(2)

Messages table stores the messages sent between the people within the given organisation. chat_id(text) column holds the string which is made by sorting the timeuuid of the sender and reciever and joining them, which is guranteed to produce the same text always

Transactions table stores the details of all the transactions made by the organisation manager to the employee. Transactions made to an specfic employee can be searched using their email address

Tokens table is used to store the id and jwt session token of the user which helps in authenticating and authorizing the user to the server

Sockets table holds the responsibility to keep track of the id of the socket via which the user is connected. If the user closes the tab without logging out, the socket gets disconnected and upon disconnection the server removes the user session from the db thereby logging out the user

#### 🚀 Backend
As mentioned earlier Aneta's backend is written in JavaScript with NodeJs. Handling the requests from client side was possible through ExpressJs framework. Custom middleware was written for verifying the users with the help of JSON Web Token package. Cassandra driver was used to communicate with Astra DB from the server.  Morgan was handy when it comes to logging the details about the incoming requests

#### ✨ Frontend
Aneta's frontend is written in TypeScript with ReactJs. styled-components have been used for styling in order to avoid overlapping of the styles upon bundling. To make api call axios is being used rather than the inbuilt fetch api. State of the app is managaed with the help of react context in order to avoid the boilerplate code being produced when using redux. But when the right time comes state management will be switched to redux as it would be easy to manage to new data that will be added. The timeago Js library is used to convert the date object to string indicating the time in natural language. There are 11 pages and 46 components and the routing is managed with react-router-dom

#### 💰 Business
Aneta's main source of income is from the plans provided to the organisations. There are four plans namely Micro, Small, Medium and Large. Each plan allows the organisations to have upto an fixed resources and projects. With Micro plan (19$/mo), the organisation can have upto 100 resources and 15 projects. Using Small plan (79$/mo), capacity of 1,000 resources and 100 projects is allocated to the organisation. With Medium plan (599$/mo), the organisation can have upto 100,000 resources and 400 projects. Using Large plan (2799$/mo), capacity of 500,000 resources and 1000 projects is allocated to the organisation
