import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { reducer as chartReducer, pigreducer as pigReducer } from './chart';

const devtools = window.devToolsExtension || (() => noop => noop);

const rootReducer = combineReducers({
  charts: chartReducer,
  pigs: pigReducer
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
