# How does the API work

## src/server/controllers/

Holds the controllers, the base controller does the database interaction. All CRUD controllers inherit from this base controller. Database operations are fully promisified.

## src/server/models/

Holds the MongoDB schemas and exports the models.

## src/server/routes/

This folder contains an index file which is a grouping of the individual routes. Consider this example from task.route.js:

```javascript
router.route('/').get(controller.list).post(controller.create)

router.route('/:key').get(controller.read).delete(controller.delete).put(controller.update)
```

The API provides GET and POST endpoints in on localhost:4040/api/tasks/ (dev environment). Those routes correspond to list and create operations.

The API also provides GET, DELETE and PUT endpoints based on the key, the key for a type can be found as the second argument of its respective controller file. Most often it is the name, though a switch to an ID-based system is still open for discussion. These routes correspond to the read (= retrieve 1), delete and update operations for the item.

These API endpoints hold true for the CRUD types. 

Types that require authentication like Worker and Supervisor have different behavior and additional routes to accomodate their needs.


# Built on node boilerplate with with the addition of generic DAO

This is my node boilerplate starter kit. I will continue to update with the latest tech to help make make node services
super easy and efficient to kick start.

## Whats out the box?

### Frameworks
- Node 7 + ES6 (Babel)
- Express
- Passport
- Mongoose
- Joi

### Developer tools
- Jest
- Docker
- Husky (Githooks)

## Instructions

Install [mongodb](https://www.mongodb.com/download-center?jmp=nav#community) and fire up the server

```
# mongod

or via systemd, service might also be called mongod instead of mongodb

# systemctl start mongodb


```

Install [`yarn`](https://www.npmjs.com/package/yarn). Not used yarn yet? Do its awesome... and required

```
npm install -g yarn
```

Pull down the repository

```
git clone https://github.com/Str-Gen/APIGeppetto.git
```

Run yarn in the root of your project to install its dependencies

```
yarn
```

### Server

Start in development mode http://localhost:4040/api/health-check

```
yarn dev
```

Build the distributable

```
yarn build
```

Build the distributable + start node server http://localhost:8080/api/health-check

```
yarn start
```

### Tests

Run tests or code coverage in Jest

```
yarn test
yarn test:coverage
```

Running lint **(deprecated)**

** ESLint has now been removed in favour of Prettier. As of version 1.0.0, semi colons are now optional and disabled as
default. **

```
yarn lint
yarn lint:watch
yarn lint:fix // attempts to fix your lint issues for you
```


## Todo
- [ ] add dotenv

Inspired by [KunalKapadia](https://github.com/KunalKapadia/express-mongoose-es6-rest-api) and  [Developit](https://github.com/developit/express-es6-rest-api)
