# space-rent-api

Deploy: https://space-rent-api.herokuapp.com/ 

Endpoints Table:
| DOC               | METHOD | ENDPOINT     | PAYLOAD                                                    | RESPONSE       | ACTION             |
| ----------------- | ------ | ------------ | ---------------------------------------------------------- | -------------- | ------------------ |
| auth.routes.js    | POST   | /auth/signup | {username, password, biography}                            | {User}         | create new user    |
| auth.routes.js    | POST   | /login       | {username, password}                                       | {User}         | login              |
| user.routes.js    | GET    | /users       | \-                                                         | \[{Users}\]    | get all users      |
| user.routes.js    | GET    | /:userId     | \-                                                         | {User}         | get unique user    |
| user.routes.js    | PUT    | /:userId     | {username, biography}                                      | {User}         | update user        |
| space.routes.js   | POST   | /spaces      | {name, description, adress, size, purposes, images, price} | {Space}        | create new space   |
| space.routes.js   | GET    | /spaces      | \-                                                         | \[{Spaces}\]   | get all spaces     |
| space.routes.js   | GET    | /:spaceId    | \-                                                         | {Space}        | get unique space   |
| space.routes.js   | PUT    | /:spaceId    | {name, description, adress, size, purposes, images, price} | {Space}        | update space       |
| space.routes.js   | DELETE | /:spaceId    | \-                                                         |                | delete space       |
| event.routes.js   | POST   | /:spaceId    | {title, description, date, price}                          | {Event}        | create new event   |
| event.routes.js   | GET    | /events      | \-                                                         | \[{Events}\]   | get all events     |
| event.routes.js   | GET    | /:eventId    | \-                                                         | {Event}        | get unique event   |
| event.routes.js   | PUT    | /:eventId    | {title, description, date, price}                          | {Event}        | update event       |
| event.routes.js   | DELETE | /:eventId    | \-                                                         | \-             | Delete Event       |
| comment.routes.js | POST   | /:spaceId    | {comment}                                                  | {comment}      | create new comment |
| comment.routes.js | GET    | /:spaceId    | \[{comments}\]                                             | \[{comments}\] | get all comments   |
| comment.routes.js | PUT    | /:commentId  | {comment}                                                  | {comment}      | update comment     |
| comment.routes.js | DELETE | /:commentId  | \-                                                         | \-             | delete comment     |
