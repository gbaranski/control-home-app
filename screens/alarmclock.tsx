import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  ButtonGroup,
  Layout,
  Text,
  Toggle,
  Divider,
  Icon,
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
  const [text, setText] = React.useState('Press any button');
  const [activeChecked, setActiveChecked] = React.useState(false);
  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
  };
  return (
    <Layout style={{flex: 1, paddingTop: 60, alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Text category="h6" style={{alignSelf: 'flex-start', left: -50}}>
          <MaterialIcons name="thermometer" size={20} />
          TEMPERATURE
        </Text>
        <Text category="h6" style={{alignSelf: 'flex-end', right: -50}}>
          HUMIDITY
          <MaterialIcons name="water" size={20} />
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styleSheet.temperatureText}>28.5°C</Text>
        <Text style={styleSheet.humidityText}>28%</Text>
      </View>

      <Text category="h3">{text}</Text>
      <ButtonGroup>
        <Button
          accessoryRight={testAlarmIcon}
          onPress={() => setText('Left button pressed')}>
          Test alarm
        </Button>
        <Button
          accessoryRight={addAlarmIcon}
          onPress={() => setText('Middle button pressed')}>
          Set Alarm
        </Button>
        <Button
          accessoryRight={refreshIcon}
          onPress={() => setText('Right button pressed')}>
          Fetch
        </Button>
      </ButtonGroup>
      <Toggle
        style={{alignSelf: 'flex-start', marginTop: 10}}
        checked={activeChecked}
        onChange={onActiveCheckedChange}>
        Alarm clock state
      </Toggle>
    </Layout>
  );
}
