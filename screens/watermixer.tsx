import * as React from 'react';
import {Layout, Text, Modal, Card, Button} from '@ui-kitten/components';
import {styleSheet} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import {useInterval, formatTotalSeconds} from './helpers';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const switchIconOn = () => (
  <MaterialIcons
    name="toggle-switch"
    color={'#32a852'}
    size={28}
    style={styleSheet.switchIcon}
  />
);

const switchIconOff = () => (
  <MaterialIcons
    name="toggle-switch-off"
    color={'#ff453a'}
    size={28}
    style={styleSheet.switchIcon}
  />
);
async function getRemoteData(username: string, password: string) {
  const response = await fetch(
    `https://${username}:${password}@control.gbaranski.com/getWaterMixerESPData`,
    {
      method: 'GET',
    },
  ).catch((error) => {
    Alert.alert(error);
    return error;
  });
  return response.json();
}
async function fetchUrl(
  queryString: string,
  username: string,
  password: string,
) {
  const url =
    `https://${username}:${password}@control.gbaranski.com` + queryString;
  const response = await fetch(url, {
    method: 'GET',
  }).catch(() => {
    return;
  });
  return response;
}

export default function Watermixer() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remoteData, setRemoteData] = React.useState({
    remainingSeconds: 0,
    isTimerOn: 0,
  });
  const [isModalVisible, setModalVisiblity] = React.useState(false);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('credentials');
      return jsonValue !== undefined ? JSON.parse(jsonValue || ' ') : undefined;
    } catch (e) {
      // error reading value
      Alert.alert('Error reading value');
    }
  };
  useEffect(() => {
    getData()
      .then((credentials) => {
        if (credentials && credentials.username && credentials.password) {
          setUsername(credentials.username);
          setPassword(credentials.password);
        }
      })
      .catch(console.error);
  }, []);

  useInterval(() => {
    getRemoteData(username, password).then((json) => setRemoteData(json));
    // Alert.alert(String(remoteData.remainingSeconds));
  }, 1000);

  return (
    <Layout style={styleSheet.alarmClockLayout}>
      <Text category="h1">REMAINING TIME</Text>
      <Text category="h5">
        {formatTotalSeconds(remoteData.remainingSeconds)}
      </Text>
      <Button
        style={styleSheet.switchStateButton}
        accessoryRight={remoteData.isTimerOn ? switchIconOn : switchIconOff}
        onPress={async () => {
          setModalVisiblity(true);
          fetchUrl('/startMixing', username, password).then(() => {
            setModalVisiblity(false);
          });
        }}>
        Switch alarm state
      </Button>
      <Modal visible={isModalVisible} backdropStyle={styleSheet.modalBackdrop}>
        <Card disabled={true}>
          <Text>Please wait for request to complete.{'\n'}</Text>
          <Button onPress={() => setModalVisiblity(false)}>CANCEL</Button>
        </Card>
      </Modal>
    </Layout>
  );
}
