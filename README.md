# Recipe App

A React and Redux recipe app.

##Installation
`npm install`

To run the app: `npm start` browser to `http://0.0.0.0:3000`

To run the tests: `npm test`

Node version used: 4.2.2

##The Approach

Firstly, I read through the feature files and broke the development down into tasks. Starting with listing out all the recipes, then moving on to the detail page, then the filter etc. I implemented each of these individually, and then when another feature affected the implementation of these features, I refactored and ensured the appropriate test coverage was there.

I used React to build components that handle the displaying of the data and then decided to use Redux to manage the state of the app. This allows the view and business logic to be separated. Redux gives a one way data flow, which makes state easier to handle. A dispatched action triggers an update to the state, via a reducer, and the appropriate parts of the application are updated with the minimum possible DOM manipulations, thanks to React's Virtual DOM.

The feature files also acted as the test scenarios and allowed basic test scenarios to be laid down based on behaviour, followed by more advanced/edge cases.

Once the application's behaviour were in place I then very basically styled the app.
