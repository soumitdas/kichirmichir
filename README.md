# Kichir Michir

<p align="center">
  <img alt="screenshot of kichirmichir" src="https://i.imgur.com/iZ7I5j2.png">
</p>

![GitHub language count](https://img.shields.io/github/languages/count/soumitdas/kichirmichir) ![GitHub top language](https://img.shields.io/github/languages/top/soumitdas/kichirmichir) ![Website](https://img.shields.io/website?url=https%3A%2F%2Fkichirmichir-dev.web.app%2F)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Run Locally](#run-locally)
- [Future Scope](#future-scope)
- [License](#license)
- [Disclaimer](#disclaimer)
- [Useful Links](#useful-links)

## Features

- An user can follow other users
- User can like a post and can comment on a post
- Search user using their username

## Demo

You can create an account at **Kichir Michir** to explore or use the below credentials to Sign-in.

### Demo Credentials

- Email: demo@example.com
- Password: superSecret89

### [Click here](https://kichirmichir-dev.web.app/) for the Live Demo

## Technology Stack

- ReactJS
- Firebase
- Bulma CSS

## Run Locally

### Prerequisites

To run this project locally one should have -

- A Firebase project created (Refer [Firebase Docs](https://firebase.google.com/docs/web/setup) for more)

### Get the repo

Download the .zip file from Github or run the below command to clone the repo locally.

```bash
git clone https://github.com/soumitdas/kichirmichir.git
```

### Install dependencies

After cloning the repo, run the following commands to install the project dependencies:

```bash
# for React app
npm install

# for Cloud functions
cd functions && npm install
```

### Set environment

Set the environment variable in `.env` file at root directory. `.env.development` file is given an a template.

```bash
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_FIREBASE_CONFIG=firebase_config_object_stringified
```

### Deploy Cloud Functions

- Install the Firebase CLI
- Setup the CLI using `firebase login` and `firebase init` (refer [docs](https://firebase.google.com/docs/cli))
- Run the following commands to deploy functions

```bash
firebase deploy --only functions
```

### Run

```bash
npm start
# React App will start at PORT 3000
```

## Future Scope

- Currently Firebase SDK support only 10 parameters in `where("field", in, [...params.length <= 10])`. So the Feed only contains max 10 users post (including self). This limitation may be solved in future
- Support Full-text search
- Support media (images, videos etc) in posts
- Push notification
- Chat functionality

## License

kichirmichir is [MIT licensed](http://opensource.org/licenses/MIT).

## Disclaimer

This project is in a very basic stage and might have severe bugs and vulnerabilities, so please keep that in mind when deploying it to production.

## Useful Links

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com)
- [Bulma](https://bulma.io/)
