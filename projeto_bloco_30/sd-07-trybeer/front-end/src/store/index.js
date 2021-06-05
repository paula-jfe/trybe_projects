import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

// const extension = window.devToolsExtension() || ((f) => f);

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart'], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { persistor, store };
