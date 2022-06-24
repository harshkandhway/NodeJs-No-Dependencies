# NodeJs-No-Dependencies

Node Js application without any external dependencies. No express, no npm. :)

An "uptime monitor" allows users to enter URLs they want monitored. and receive alerts when those resouces "go down" or "come back up".

- Include sign-up and sign-in with proper validations
- Edit settins
- Up alers and down alerts via sms.

## List of tasks

- The API listens on a PORT and accepts income HTTP requests for POST, GET, PUT, DELETE and HEAD

- The Api allows a client to connect then create a new user, then edit and delete that user.

- The Api allows a user to "sign in" which gives them a token that they can use for subsequent authenticated requests.

- The API allows the the user to "sign out" which invalidates their token.

- The API allows a signed-in user to use their token to create a new "check"

- The API allows a signed-in user to edit or delete any of their checks

- In the bakground, workers perform all the "checks" at the appropriate time, and send alerts to the users when a check changes its state from "up" to "down", or vise versa.


