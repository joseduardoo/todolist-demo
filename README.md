# ToDo Webcomponent Boiler Plate

This repo is intended as a simple boiler to test webcomponents with FAST.

## Install and run

```
npm install
npm start
```

This will run the dev front server at:
http://localhost:8000

And the backedn dummy server at:
http://localhost:3005

## Structure

- ./backend/: this a dummy backend service that use express for todo endpoints and nedb to create a local test db
- ./index.html: This is the entrypoint that is displayed on the dev server. we use vite
- ./src/components/: Fast webcomponents is stored here, "TodoList" is the entrypoint.
- ./src/store/: This handle all the logic states and actions
  - store.js: Here we declare and configure the store
  - actions.js: This should be the only place fro action to make apicalls and edit store
  - reducer: Here we handle the logis of the states on the store.

## Build and entrypoints

You can edit the index.html to load the webcomponents Fast folder or also can load the bundle from /dist

<script type="module" src="./src/componentsLit/TodoList.ts"></script>

To create a bundle you just need run

```
npm run build
```

You can set the source entrypoint from Lit or Fast on the rollup.config.js

```
  input: ["./src/componentsLit/TodoList.ts"]
```

## Redux Devtool

The devtool are enabled for this repo, you can install the chrome extension here:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es
