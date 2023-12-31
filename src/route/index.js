import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screen/home';
import ProfileScreen from '../screen/profile';
import FormScreen from '../screen/form';
import {Button} from 'react-native';
// import Page1Screen from '../screens/Page1Screen';
// import Page2Screen from '../screens/Page2Screen';
// import Page3Screen from '../screens/Page3Screen';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={
            {
              // headerTitle: props => <LogoTitle {...props} />,
              // eslint-disable-next-line react/no-unstable-nested-components
              // headerLeft: () => (
              //   <Button
              //     onPress={() => alert('This is a button!')}
              //     title="Info"
              //     color="#fff"
              //   />
              // ),
            }
          }
        />
        <Stack.Screen name="Profile Contact" component={ProfileScreen} />
        <Stack.Screen name="Edit" component={FormScreen} />
        <Stack.Screen name="Create" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
