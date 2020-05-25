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

export default function Alarmclock() {
  const [isTimePickerVisible, setTimePickerVisiblity] = React.useState(false);
  const [isModalVisible, setModalVisiblity] = React.useState(false);
  const [modalText, setModalText] = React.useState(
    'Please wait for request to complete.',
  );
  const [activeChecked, setActiveChecked] = React.useState(false);
  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
  };
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
        <Text style={styleSheet.remainingTimeText}>07:30</Text>
        <Text style={styleSheet.alarmTimeText}>21:20</Text>
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
        <Text style={styleSheet.temperatureText}>28.5°C</Text>
        <Text style={styleSheet.humidityText}>28%</Text>
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
          <Text>{modalText}</Text>
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
