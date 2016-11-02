import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { statusReducer, pigsReducer, shadowpigsReducer, timelineReducer } from './index.js';

const devtools = window.devToolsExtension || (() => noop => noop);

const rootReducer = combineReducers({
  status: statusReducer,
  pigs: pigsReducer,
  shadowpigs: shadowpigsReducer,
  timeline: timelineReducer
//  session: (state = {}) => state,
});


const enhancer = compose(
  devtools()
);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer);
  return store;
}
