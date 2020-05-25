import * as React from 'react';
import {Layout, Text, Modal, Card, Button} from '@ui-kitten/components';
import {styleSheet} from './styles';
import {useEffect} from 'react';
import {
  useInterval,
  formatTotalSeconds,
  getData,
  fetchUrl,
  getRemoteData,
} from './helpers';
import {switchIconOn, switchIconOff} from './icons';
import {DeviceTypes} from '../types';

export default function Watermixer() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remoteData, setRemoteData] = React.useState({
    remainingSeconds: 0,
    isTimerOn: 0,
  });
  const [isModalVisible, setModalVisiblity] = React.useState(false);

  useEffect(() => {
    getData()
      .then((credentials) => {
        if (credentials && credentials.username && credentials.password) {
          setUsername(credentials.username);
          setPassword(credentials.password);
        }
      })
      .catch(console.error);
  }, []);

  useInterval(() => {
    getRemoteData(username, password, DeviceTypes.WATERMIXER).then((json) =>
      setRemoteData(json),
    );
    // Alert.alert(String(remoteData.remainingSeconds));
  }, 1000);

  return (
    <Layout style={styleSheet.basicLayout}>
      <Text category="h1">REMAINING TIME</Text>
      <Text category="h5">
        {formatTotalSeconds(remoteData.remainingSeconds)}
      </Text>
      <Button
        style={styleSheet.switchStateButton}
        accessoryRight={remoteData.isTimerOn ? switchIconOn : switchIconOff}
        onPress={async () => {
          setModalVisiblity(true);
          fetchUrl('/startMixing', username, password).then(() => {
            setModalVisiblity(false);
          });
        }}>
        Switch alarm state
      </Button>
      <Modal visible={isModalVisible} backdropStyle={styleSheet.modalBackdrop}>
        <Card disabled={true}>
          <Text>Please wait for request to complete.{'\n'}</Text>
          <Button onPress={() => setModalVisiblity(false)}>CANCEL</Button>
        </Card>
      </Modal>
    </Layout>
  );
}
