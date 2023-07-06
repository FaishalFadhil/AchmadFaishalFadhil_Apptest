import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/service';
import {watchDataSaga} from './src/service/contact/saga';
import MainNavigator from './src/route';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchDataSaga);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
