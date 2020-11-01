// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//     // () => [],
//     rootReducer,
//     initialState,
//     compose(
//         applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// export default store;




import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [
  thunk
]
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function persistState(state) {
  try {
      const serializedState = JSON.stringify(state);
      if (!window.location.href.includes("logout")) {
          localStorage.setItem("state", serializedState);
      } else {
          localStorage.setItem("state", "");
      }
  } catch (err) {
      console.log(err)
  }
}

function rehydrateState() {
  try {
      const serializedState = localStorage.getItem("state");

      if (serializedState === null || serializedState === "") {
          return undefined;
      }
      const parsedState = JSON.parse(serializedState);
      return parsedState;

  } catch (err) {
      console.log(err);
      return undefined;
  }
}

const persistedState = rehydrateState();

const store =  createStore(
  rootReducer, 
  {...persistedState},  
  withDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => persistState(store.getState()));


export default store;