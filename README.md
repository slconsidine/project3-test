ipstack API key - e8dc22e36bb38cce9e75705776e3ca42

client package.json
"proxy": "http://localhost:3001/",
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1",
    "react-router-dom": "^4.3.1",
    "axios": "^0.18.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },

  root package json
  "scripts": {
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "seed": "node scripts/seedDB.js",
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run build"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^4.1.0",
    "nodemon": "^1.18.7"
  },
  "dependencies": {
    "axios": "^0.19.2",
    "express": "^4.17.1",
    "if-env": "^1.0.4",
    "mongoose": "^5.9.13",
    "path": "^0.12.7"
  }