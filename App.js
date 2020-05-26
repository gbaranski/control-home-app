import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Alert} from 'react-native';
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import Alarmclock from './screens/alarmclock';
import Watermixer from './screens/watermixer';
import Settings from './screens/settings';

const WaterIcon = (props) => <Icon {...props} name="droplet-outline" />;
const WaterIconFill = (props) => <Icon {...props} name="droplet" />;

const AlarmIcon = (props) => <Icon {...props} name="clock-outline" />;
const AlarmIconFill = (props) => <Icon {...props} name="clock" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />;
const SettingsIconFill = (props) => <Icon {...props} name="settings" />;

const {Navigator, Screen} = createBottomTabNavigator();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);

export default function App() {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    return unsubscribe;
  }, []);

  requestUserPermission();
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
      <Screen name="Alarmclock" component={Alarmclock} />
      <Screen name="Watermixer" component={Watermixer} />
      <Screen name="Settings" component={Settings} />
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
    <BottomNavigationTab
      icon={state.index === 2 ? SettingsIconFill : SettingsIcon}
      title="SETTINGS"
    />
  </BottomNavigation>
);
