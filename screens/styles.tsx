import {StyleSheet} from 'react-native';

export const styleSheet = StyleSheet.create({
  // CURRENT TIME
  aboveCurrentTimeText: {
    fontSize: 22,
    fontFamily: 'AppleSDGothicNeo-Light',
    position: 'absolute',
    left: 7,
    top: 130,
    textAlign: 'center',
  },
  currentTimeText: {
    fontSize: 56,
    fontFamily: 'AppleSDGothicNeo-Medium',
    position: 'absolute',
    left: 5,
    top: 150,
  },
  // ALARM TIME
  aboveAlarmTimeText: {
    fontSize: 21,
    fontFamily: 'AppleSDGothicNeo-Light',
    position: 'absolute',
    right: 10,
    top: 130,
    textAlign: 'center',
  },
  alarmTimeText: {
    fontSize: 56,
    fontFamily: 'AppleSDGothicNeo-Medium',
    position: 'absolute',
    right: 0,
    top: 150,
  },
  // REMAINING TIME
  aboveRemainingTimeText: {
    fontSize: 21,
    fontFamily: 'AppleSDGothicNeo-Light',
    top: 60,
    textAlign: 'center',
  },
  remainingTimeText: {
    fontSize: 56,
    fontFamily: 'AppleSDGothicNeo-Medium',
    top: 60,
    textAlign: 'center',
  },

  timePickerView: {
    width: '100%',
    backgroundColor: '#314552',
    bottom: 0,
    position: 'absolute',
  },
  buttonsView: {
    position: 'absolute',
    top: 300,
    left: 0,
  },
  temperature: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 24,
    position: 'absolute',
    top: 230,
    left: 10,
  },
  humidity: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 24,
    position: 'absolute',
    top: 270,
    left: 10,
  },
});
