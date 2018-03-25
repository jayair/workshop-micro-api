# workshop-micro-api
A simple in-memory API for a todo app

Run the following to get started

```bash
$ npm run dev
```

---

## Step 1

Create a new directory.

```bash
$ mkdir micro-api
```

## Step 2

Create a file called `package.json` and add the following.

```json
{
  "name": "api",
  "engines": {
    "node": "8.9.4"
  },
  "scripts": {
    "start": "micro",
    "dev": "micro-dev"
  },
  "dependencies": {
    "micro": "latest",
    "micro-dev": "latest",
    "micro-cors": "latest"
  }
}
```

## Step 3

Let's install the packages.

```bash
$ npm install
```

## Step 4

Create a file called `index.js` and add the following.

```js
const { json } = require("micro");

const list = ["Install stuff", "Look at the slides", "Starting hacking"];

module.exports = req => {
  return list;
};
```

## Step 5

Start our API.

```bash
$ npm run dev
```

## Step 6

Let's quickly test it in a new terminal.

```bash
$ curl http://localhost:3000
```

Your output should look like this:

```json
[
  "Install stuff",
  "Look at the slides",
  "Starting hacking"
]
```

## Step 7

Let's add our `PUT` request. Replace your `index.js` with:

```js
const { json } = require("micro");

const list = ["Install stuff", "Look at the slides", "Starting hacking"];

module.exports = async req => {
  let body;

  switch (req.method) {
    case "PUT":
      body = await json(req);
      list.push(body.text);
      break;
  }

  return list;
};
```

## Step 8

Test our `PUT` request.

```bash
$ curl http://localhost:3000 -X PUT -d '{"text":"Buy eggs"}'
```

Your output should look like this:

```json
[
  "Install stuff",
  "Look at the slides",
  "Starting hacking",
  "Buy eggs"
]
```

## Step 9

Let's add our `DELETE` request. Replace your `index.js` with:

```js
const { json } = require("micro");

const list = ["Install stuff", "Look at the slides", "Starting hacking"];

module.exports = async req => {
  let body;

  switch (req.method) {
    case "PUT":
      body = await json(req);
      list.push(body.text);
      break;
    case "DELETE":
      body = await json(req);
      list.splice(body.id, 1);
      break;
  }

  return list;
};
```

## Step 9

Test our `DELETE` request.

```bash
$ curl http://localhost:3000 -X DELETE -d '{"id":3}'
```

Your output should look like this:

```json
[
  "Install stuff",
  "Look at the slides",
  "Starting hacking"
]
```

## Step 10

Finally let's add `CORS` support. Replace your `index.js` with:

```js
const { json } = require("micro");
const cors = require("micro-cors")();

const list = ["Install stuff", "Look at the slides", "Starting hacking"];

module.exports = cors(async req => {
  let body;

  switch (req.method) {
    case "PUT":
      body = await json(req);
      list.push(body.text);
      break;
    case "DELETE":
      body = await json(req);
      list.splice(body.id, 1);
      break;
  }

  return list;
});
```
