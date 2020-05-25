import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ButtonGroup,
  Layout,
  Text,
  Toggle,
  Icon,
  Modal,
  Card,
} from '@ui-kitten/components';
import {styleSheet} from './styles';
import {View} from 'react-native';

const refreshIcon = (props) => <Icon {...props} name={'refresh-outline'} />;
const addAlarmIcon = () => (
  <MaterialIcons name="alarm-plus" size={18} color={'#ffff'} />
);
const testAlarmIcon = () => (
  <MaterialIcons name="do-not-disturb" size={18} color={'#ffff'} />
);

async function getRemoteData() {
  const response = await fetch('http://192.168.1.10:3001/getESPData', {
    method: 'GET',
  });
  return response.json();
}

export default function Alarmclock() {
  const [remoteData, setRemoteData] = React.useState({
    currentTime: '',
    alarmTime: '',
    remainingTime: '',
    alarmState: '',
    temperature: '',
    humidity: '',
    heatIndex: '',
  });

  const [isTimePickerVisible, setTimePickerVisiblity] = React.useState(false);

  const [isModalVisible, setModalVisiblity] = React.useState(false);

  const [activeChecked, setActiveChecked] = React.useState(false);

  const onActiveCheckedChange = (isChecked: boolean) => {
    setActiveChecked(isChecked);
  };

  React.useEffect(() => {
    setInterval(async () => {
      getRemoteData().then((json) => setRemoteData(json));
    }, 1000);
  }, [remoteData.alarmState]);
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
          // onPress={() => setText('Left button pressed')}
        >
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
          onPress={() => {
            setModalVisiblity(true);
          }}>
          Fetch
        </Button>
      </ButtonGroup>
      <Toggle
        style={styleSheet.toggleState}
        checked={activeChecked}
        onChange={onActiveCheckedChange}>
        Alarm clock state
      </Toggle>

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
            timeZoneOffsetInMinutes={3600}
            value={new Date()}
            mode={'time'}
            is24Hour={true}
            display="default"
          />
          <Button onPress={() => setTimePickerVisiblity(false)}>Done</Button>
        </View>
      )}
    </Layout>
  );
}
