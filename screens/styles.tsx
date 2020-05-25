import {StyleSheet} from 'react-native';

export const styleSheet = StyleSheet.create({
  aboveRemainingTimeText: {
    alignSelf: 'flex-start',
    right: 30,
  },
  remainingTimeText: {
    alignSelf: 'flex-start',
    right: 90,
    fontFamily: 'Courier',
    fontSize: 22,
  },
  aboveAlarmTimeText: {
    alignSelf: 'flex-end',
    left: 30,
  },
  alarmTimeText: {
    alignSelf: 'flex-start',
    left: 90,
    fontFamily: 'Courier',
    fontSize: 22,
  },

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
  switchIcon: {
    height: 18,
    lineHeight: 23,
  },
  switchStateButton: {
    marginTop: 5,
  },
  basicLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
