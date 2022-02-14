# To-do list application
The app has been developed with NextJS, Typescript and Taiwindcss to meet the following requirements.

- Add and view tasks
- Delete a task
- Complete a task
- Set a priority for my tasks
- View the tasks sorted by priority and name
- View the number of total and completed tasks

I used the pnpm package manager, simply because of performance reasons, but this can be easily changed to npm or yarn at any point. To run the app simply execute
`pnpm i && pnpm dev`

To demonstrate my approach to large scale projects I used Redux Toolkit and adopted a folder-by-feature structure (hence the `/src/features` folder).

Unit tests using jest and react-testing-library can be found in `/src/features/todos/Todos.spec.tsx`. End to end tests using cypress are in `/cypress/intergration/todos.spec.js`. The tests are by no means comprehensive but just a demonstration of some of some of the ways tests could be implemented in this app.

To run the unit test, execute `pnpm test`
To run the cypress tests, execute `pnpm cypress:run` or otherwise `pnpm cypress` for the interactive cypress testing.