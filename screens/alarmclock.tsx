import * as React from 'react';
import {useState} from 'react';
import {Text, View, Switch, TextInput, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DateTimePicker from '@react-native-community/datetimepicker';

import {styleSheet} from './styles';

export default function Alarmclock() {
  const [alarmState, setAlarmState] = useState(false);

  const toggleSwitchState = () => setAlarmState((alarmState) => !alarmState);

  const [isTimePickerVisible, setTimePickerVisiblity] = useState(false);

  const [timeValue, setTimeValue] = useState(new Date());

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#42D0C5'}}>
      <View
        style={{backgroundColor: '#314552', width: '100%', marginBottom: 30}}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            alignSelf: 'center',
            padding: 40,
            fontSize: 40,
            color: 'white',
          }}>
          Alarm clock
        </Text>
      </View>
      <Text style={styleSheet.aboveCurrentTimeText}>Current time</Text>
      <Text style={styleSheet.currentTimeText}>12.30</Text>
      <Text style={styleSheet.aboveAlarmTimeText}>Alarm time</Text>
      <Text style={styleSheet.alarmTimeText}>21.30</Text>
      <Text style={styleSheet.aboveRemainingTimeText}>Remaining time</Text>
      <Text style={styleSheet.remainingTimeText}>09:30</Text>
      <View style={styleSheet.temperature}>
        <Text style={{fontSize: 24}}>
          <MaterialCommunityIcons name={'thermometer'} size={24} />
          36°C
        </Text>
      </View>
      <View style={styleSheet.humidity}>
        <Text style={{fontSize: 24}}>
          <MaterialCommunityIcons
            name={'water-outline'}
            size={24}
            color={'#031C57'}
          />
          50%
        </Text>
      </View>

      <View
        style={{
          left: 5,
          top: 320,
          position: 'absolute',
          backgroundColor: '#1677BF',
          borderRadius: 10,
        }}>
        <Button
          title="Test alarm!"
          color="white"
          onPress={() => setTimePickerVisiblity(true)}
        />
      </View>

      <View
        style={{
          left: 120,
          top: 320,
          position: 'absolute',
          backgroundColor: '#1677BF',
          borderRadius: 10,
        }}>
        <Button
          title="Set time!"
          color="white"
          onPress={() => setTimePickerVisiblity(true)}
        />
      </View>
      <View
        style={{
          left: 220,
          top: 320,
          position: 'absolute',
          backgroundColor: '#1677BF',
          borderRadius: 10,
        }}>
        <Button
          title="Fetch data"
          color="white"
          onPress={() => setTimePickerVisiblity(true)}
        />
      </View>
      <Switch
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: 325,
          right: 5,
          transform: [{rotate: '90deg'}],
        }} // TODO FIX
        trackColor={{false: '#767577', true: '#30d158'}}
        thumbColor={'#f2f2f7'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchState}
        value={alarmState}
      />
      {isTimePickerVisible && (
        <View style={styleSheet.timePickerView}>
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={timeValue}
            mode={'time'}
            is24Hour={true}
            display="default"
          />
          <Button title="Done" onPress={() => setTimePickerVisiblity(false)} />
        </View>
      )}
    </View>
  );
}
