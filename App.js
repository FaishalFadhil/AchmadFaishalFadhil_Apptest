import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/service';
import {watchDataSaga} from './src/service/contact/saga';
import MainNavigator from './src/route';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, createTheme} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchDataSaga);

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
