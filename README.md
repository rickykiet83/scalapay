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
