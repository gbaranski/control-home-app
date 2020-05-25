import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Layout, Input, Icon, Button} from '@ui-kitten/components';
import {TouchableWithoutFeedback, Alert} from 'react-native';

const AlertIcon = (props: any) => (
  <Icon {...props} name="alert-circle-outline" />
);

export default function Settings() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('credentials');
      return jsonValue !== undefined ? JSON.parse(jsonValue || ' ') : undefined;
    } catch (e) {
      // error reading value
      Alert.alert('Error reading value');
    }
  };

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

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const saveEntry = async () => {
    try {
      const credentialsJson = {
        username,
        password,
      };
      const jsonValue = JSON.stringify(credentialsJson);
      await AsyncStorage.setItem('credentials', jsonValue);
      Alert.alert('Saved successfully');
    } catch (e) {
      Alert.alert('Error saving value');
      // saving error
    }
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="">Settings</Text>
      <Input
        placeholder="Your username here"
        label="  USERNAME"
        onChangeText={setUsername}
        value={username}
      />
      <Input
        value={password}
        label="PASSWORD"
        placeholder="Your password here"
        caption="Long mixed password"
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button onPress={saveEntry}>SAVE</Button>
    </Layout>
  );
}