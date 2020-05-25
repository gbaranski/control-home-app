import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ButtonGroup,
  Layout,
  Text,
  Icon,
  Modal,
  Card,
} from '@ui-kitten/components';
import {styleSheet} from './styles';
import {View, Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {useInterval} from './helpers';

const refreshIcon = (props: any) => (
  <Icon {...props} name={'refresh-outline'} />
);
const addAlarmIcon = () => (
  <MaterialIcons name="alarm-plus" size={18} color={'#ffff'} />
);
const testAlarmIcon = () => (
  <MaterialIcons name="do-not-disturb" size={18} color={'#ffff'} />
);
const switchIconOn = () => (
  <MaterialIcons
    name="toggle-switch"
    color={'#32a852'}
    size={28}
    style={{height: 18, lineHeight: 23}}
  />
);

const switchIconOff = () => (
  <MaterialIcons
    name="toggle-switch-off"
    color={'#ff453a'}
    size={28}
    style={{height: 18, lineHeight: 23}}
  />
);

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

async function getRemoteData(username: string, password: string) {
  const response = await fetch(
    `https://${username}:${password}@control.gbaranski.com/getAlarmESPData`,
    {
      method: 'GET',
    },
  ).catch((error) => error);
  return response.json();
}

export default function Alarmclock() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remoteData, setRemoteData] = React.useState({
    currentTime: '',
    alarmTime: '',
    remainingTime: '',
    alarmState: 0,
    temperature: 0,
    humidity: 0,
    heatIndex: 0,
  });
  const [isModalVisible, setModalVisiblity] = React.useState(false);

  async function getAndSetData() {
    setModalVisiblity(true);
    getRemoteData(username, password).then((json) => {
      setModalVisiblity(false);
      setRemoteData(json);
    });
  }

  const [isTimePickerVisible, setTimePickerVisiblity] = React.useState(false);
  const [outputTime, setOutputTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });
  const [time, setTime] = useState(new Date());
  const onTimeChange = (event, selectedTime) => {
    setTime(selectedTime || time);
    setOutputTime({
      hour: selectedTime.getHours(),
      minute: selectedTime.getMinutes(),
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('credentials');
      return jsonValue !== undefined ? JSON.parse(jsonValue || ' ') : undefined;
    } catch (e) {
      // error reading value
      Alert.alert('Error reading value');
    }
  };

  useInterval(() => {
    getRemoteData(username, password).then((json) => setRemoteData(json));
  }, 1000);

  useEffect(() => {
    // setInterval(async () => {
    //   getRemoteData().then((json) => setRemoteData(json));
    // }, 1000);
    getData()
      .then((credentials) => {
        if (credentials && credentials.username && credentials.password) {
          setUsername(credentials.username);
          setPassword(credentials.password);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <Layout style={styleSheet.alarmClockLayout}>
      <View style={styleSheet.rowFlex}>
        <Text category="h6" style={styleSheet.aboveRemainingTimeText}>
          {'  '}
          <MaterialIcons name="clock" size={18} /> REMAINING TIME
        </Text>
        <Text category="h6" style={styleSheet.aboveAlarmTimeText}>
          ALARM TIME <MaterialIcons name="clock-outline" size={18} />{' '}
        </Text>
      </View>

      <View style={styleSheet.rowFlex}>
        <Text style={styleSheet.remainingTimeText}>
          {remoteData.remainingTime}
        </Text>
        <Text style={styleSheet.alarmTimeText}>{remoteData.alarmTime}</Text>
      </View>

      <View style={styleSheet.rowFlex}>
        <Text category="h6" style={styleSheet.aboveTemperatureText}>
          <MaterialIcons name="thermometer" size={20} />
          TEMPERATURE
        </Text>
        <Text category="h6" style={styleSheet.aboveHumidityText}>
          HUMIDITY
          <MaterialIcons name="water" size={20} />
        </Text>
      </View>
      <View style={styleSheet.rowFlex}>
        <Text style={styleSheet.temperatureText}>
          {remoteData.temperature || 'Loading..'}
        </Text>
        <Text style={styleSheet.humidityText}>{remoteData.humidity}</Text>
      </View>

      <ButtonGroup style={styleSheet.buttonGroup}>
        <Button
          accessoryRight={testAlarmIcon}
          onPress={async () => {
            setModalVisiblity(true);
            fetchUrl('/testAlarm', username, password).then(() => {
              setModalVisiblity(false);
            });
          }}>
          Test alarm
        </Button>
        <Button
          accessoryRight={addAlarmIcon}
          onPress={() => {
            setTimePickerVisiblity(true);
          }}>
          Set Alarm
        </Button>
        <Button
          accessoryRight={refreshIcon}
          onPress={async () => {
            getAndSetData();
          }}>
          Fetch
        </Button>
      </ButtonGroup>

      <Button
        style={{marginTop: 5}}
        accessoryRight={remoteData.alarmState ? switchIconOn : switchIconOff}
        onPress={async () => {
          setModalVisiblity(true);
          fetchUrl(
            `/setAlarmState?state=${remoteData.alarmState ? 0 : 1}`,
            username,
            password,
          ).then(() => {
            getAndSetData();
          });
        }}>
        Switch alarm state
      </Button>

      <Modal visible={isModalVisible} backdropStyle={styleSheet.modalBackdrop}>
        <Card disabled={true}>
          <Text>Please wait for request to complete.</Text>
          <Button onPress={() => setModalVisiblity(false)}>CANCEL</Button>
        </Card>
      </Modal>

      {isTimePickerVisible && (
        <View style={styleSheet.timePickerView}>
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={120}
            value={time}
            onChange={onTimeChange}
            mode={'time'}
            is24Hour={true}
            display="default"
          />
          <Button
            onPress={async () => {
              setTimePickerVisiblity(false);
              setModalVisiblity(true);
              fetchUrl(
                `/setAlarm?time=${outputTime.hour}:${outputTime.minute}`,
                username,
                password,
              ).then(async () => {
                getAndSetData().then(() => setModalVisiblity(false));
              });
            }}>
            Done
          </Button>
        </View>
      )}
    </Layout>
  );
}
