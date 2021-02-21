Scalapay Coding Assignment

The goal is to write a simple app using the Scalapay API.

Scalapay API docs can be found here:
https://docs.api.scalapay.com/

Write an interface that:
1) Displays configuration
- Presents the v2/configuration response to the user

2) Create an order
- Prompt the user to enter the fields required to create an order
- Call the v2/orders endpoint
- Redirect the user to the checkoutUrl provided in the response



## Tech stack

- [Angular CLI][cli]
- [NodeJS][nodejs]
- [Express][expressjs]
- [Jestsjs][jestsjs]
- UI modules:
  - [AngularMaterial][angular-material]
  - [Flex-Layout][angular-flex-layout]
- [Heroku][heroku]
- [Azure][azure]

[cli]: https://cli.angular.io/
[nodejs]: https://nodejs.org/
[jestsjs]: https://jestjs.io/
[expressjs]: https://www.expressjs.com/
[heroku]: https://www.heroku.com/
[angular-material]: https://material.angular.io/
[angular-flex-layout]: https://github.com/angular/flex-layout/
[azure]: https://azure.microsoft.com/


## Setting up development environment 🛠


- `git clone https://github.com/rickykiet83/scalapay`
- `cd scalapay`

-- Backend API

- `npm run start:back` for nodejs server web application
- The server should run on `http://localhost:3000/`

-- Frontend

- `npm run start:front` for angular web application
- The app should run on `http://localhost:4200/`