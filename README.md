# mNeme Front End

- The deployed frontend url is https://mneme-staging.netlify.com

This app is designed to help people learn with flashcards. In this release canvas, users have the ability to create a profile, edit their profile preferences, view the public demo decks, and study the public demo decks.

In future releases users will have the ability to create, edit, and delete their own decks, as well as have the option to share their decks as public, or keep them private. There will also be other study techniques incorporated like spaced repetition, which will show a card more or less frequently depending on how difficult the user rates it.

### Getting Started 

To run the app locally:

- Clone the repo
- `cd frontend` to enter the frontend directory
- `npm i` to install all dependencies
- `npm start` to start the app

### Tech Stack

This app was built using:

- ReactJS
- Redux
- Sass
- Firebase Auth

This app is connected to a node backend API, which uses cloud firstore as a database: https://flashcards-be.herokuapp.com

- Documentation for the API can be found [here](https://flashcards-be.herokuapp.com/api-docs/).
 
### Dependencies

```javascript
     "@material-ui/core": "^4.8.3",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.19.0",
    "contentful": "^7.13.0",
    "firebase": "^7.6.1",
    "moment": "^2.24.0",
    "node-sass": "^4.13.0",
    "rc-progress": "^2.5.2",
    "react": "^16.12.0",
    "react-card-flip": "^1.0.10",
    "react-dom": "^16.12.0",
    "react-firebaseui": "^4.0.0",
    "react-focus-lock": "^2.0.5",
    "react-loader-spinner": "^3.1.5",
    "react-redux": "^7.1.3",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.3.0",
    "redux": "^4.0.4",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^0.88.2",
    "styled-components": "^4.4.1",
    "thunk": "0.0.1"
```

### Environment Variables

There are some necessary environment variables for the authentication system to work. They are for the firebase API key and firebase auth. These variables should be stored within a `.env.local` file that is stored within the `frontend` directory

```javascript
* REACT_APP_FIREBASE_API_KEY
* REACT_APP_FIREBASE_AUTH_DOMAIN
* REACT_APP_MEASUREMENT_ID
* REACT_APP_PROJECT_ID
* REACT_APP_APP_ID
```

https://api.codeclimate.com/v1/badges/dc8f06a18be0378f3e22/test_coverage
