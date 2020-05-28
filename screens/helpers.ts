import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useRef} from 'react';
import {DeviceTypes} from '../types';

export function useInterval(callback: any, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export function formatTotalSeconds(totalSeconds: number) {
  return (
    Math.floor((totalSeconds / 60) % 60) +
    'minutes ' +
    (totalSeconds % 60) +
    'seconds'
  );
}
export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('credentials');
    return jsonValue !== undefined ? JSON.parse(jsonValue || ' ') : undefined;
  } catch (e) {
    // error reading value
    Alert.alert('Error reading value');
  }
};

export async function fetchUrl(path: string, headers: Headers) {
  await getData().then((credentials) => {
    if (credentials && credentials.username && credentials.password) {
      headers.append('username', credentials.username);
      headers.append('password', credentials.password);
    }
  });

  const url = `https://api.gbaranski.com` + path;
  const response = await fetch(url, {
    method: 'POST',
    headers,
  });
  return response;
}

export async function getRemoteData(deviceType: DeviceTypes) {
  const headers = new Headers();

  await getData().then((credentials) => {
    if (credentials && credentials.username && credentials.password) {
      headers.append('username', credentials.username);
      headers.append('password', credentials.password);
    }
  });
  const response = await fetch(
    `https://api.gbaranski.com/api/${deviceType}/getData`,
    {
      method: 'POST',
      headers,
    },
  );
  return response;
}
