import * as React from 'react';
import {useState} from 'react';
import {Text, View, Switch} from 'react-native';

import {styleSheet} from './styles';

export default function Alarmclock() {
  const [alarmState, setAlarmState] = useState(false);

  const toggleSwitchState = () => setAlarmState((alarmState) => !alarmState);

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
      {/* <Switch
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: 150,
        }} // TODO FIX
        trackColor={{false: '#767577', true: '#30d158'}}
        thumbColor={'#f2f2f7'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchState}
        value={alarmState}
      /> */}
      <Text style={styleSheet.aboveCurrentTimeText}>Current time</Text>
      <Text style={styleSheet.currentTimeText}>12.30</Text>
      <Text style={styleSheet.aboveAlarmTimeText}>Alarm time</Text>
      <Text style={styleSheet.alarmTimeText}>21.30</Text>
      <Text style={styleSheet.aboveRemainingTimeText}>Remaining time</Text>
      <Text style={styleSheet.remainingTimeText}>09:30</Text>
    </View>
  );
}
