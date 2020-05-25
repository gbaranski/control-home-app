import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import Alarmclock from './screens/alarmclock';
import Watermixer from './screens/watermixer';

const WaterIcon = (props) => <Icon {...props} name="droplet-outline" />;
const WaterIconFill = (props) => <Icon {...props} name="droplet" />;

const AlarmIcon = (props) => <Icon {...props} name="clock-outline" />;
const AlarmIconFill = (props) => <Icon {...props} name="clock" />;
const {Navigator, Screen} = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark}}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

export function TabNavigator() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Users" component={Alarmclock} />
      <Screen name="Orders" component={Watermixer} />
    </Navigator>
  );
}

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab
      icon={state.index === 0 ? AlarmIconFill : AlarmIcon}
      title="ALARMCLOCK"
    />
    <BottomNavigationTab
      icon={state.index === 1 ? WaterIconFill : WaterIcon}
      title="WATERMIXER"
    />
  </BottomNavigation>
);
