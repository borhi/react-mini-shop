import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { createLogger } from 'redux-logger';
import throttle from 'lodash.throttle';
import cart from '@/components/cart/services/reducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const persistedState = loadState();
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  combineReducers({ cart }),
  persistedState,
  compose(applyMiddleware(...middleware)),
);

store.subscribe(throttle(() => {
  saveState({ cart: store.getState().cart });
}, 1000));

export default store;
