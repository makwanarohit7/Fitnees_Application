import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import FitScreen from './Screens/FitScreen';
import RestScreen from './Screens/RestScreen';
import WorkOutScreen from './Screens/WorkoutScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Meditation from './Screens/Meditation';
import Helth from './Screens/Helth';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Workout" component={WorkOutScreen} />
      <Stack.Screen name="Fit" component={FitScreen} />
      <Stack.Screen name="Rest" component={RestScreen} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'WorkOut') {
              iconName = focused ? 'ios-barbell' : 'ios-barbell-outline';
            } else if (route.name === 'Meditaion') {
              iconName = focused ? 'ios-disc' : 'ios-disc-outline';
            } else if (route.name === 'Health') {
              iconName = focused ? 'ios-body' : 'ios-body-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="WorkOut" component={HomeStack} />
        <Tab.Screen name="Meditaion" component={Meditation} />
        <Tab.Screen name="Health" component={Helth} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
