import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Alarmclock from './screens/alarmclock';
import Watermixer from './screens/watermixer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = route.name === 'Alarmclock' ? 'alarm' : 'water';
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={iconName || ''}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Alarmclock" component={Alarmclock} />
        <Tab.Screen name="Watermixer" component={Watermixer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
