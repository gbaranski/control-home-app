import {StyleSheet} from 'react-native';

export const styleSheet = StyleSheet.create({
  // CURRENT TIME
  aboveTemperatureText: {
    alignSelf: 'flex-start',
    left: -50,
  },
  temperatureText: {
    alignSelf: 'flex-start',
    right: 100,
    fontFamily: 'Courier',
    fontSize: 22,
  },
  aboveHumidityText: {
    alignSelf: 'flex-end',
    right: -50,
  },
  humidityText: {
    alignSelf: 'flex-start',
    left: 100,
    fontFamily: 'Courier',
    fontSize: 22,
  },
  timePickerView: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alarmClockLayout: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
  },
  buttonGroup: {
    marginTop: 20,
  },
  toggleState: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});
