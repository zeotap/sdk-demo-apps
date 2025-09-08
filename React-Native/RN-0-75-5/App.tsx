/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { initialiseZeoCollect, setEventNameProperties, setConsent, setInstantEventNameProperties, setEventProperties, setUserIdentities, unsetUserIdentities, setPageProperties, setUserProperties } from 'zeo-collect';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    initialiseZeoCollect({
      "android_write_key": "<Your_Android_Write_Key>",
      "ios_write_key": "<Your_iOS_Write_Key>",
      "batch_size": 15,
      "service_interval": 30,
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section title="Zeotap SDK">
          Added sample function call and parameters to test Zeotap SDK functions
        </Section>
        <Section title="Tracking Consent">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>Set Consent - Helps application to pass the user consent to SDK</Text>
            <Button
              title="set Consent"
              onPress={() => setConsent({
                track: true,
                identify: true,
              })}
            />
          </View>
        </Section>
        <Section title="Track Events">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setEventNameProperties - Tracks a named event in the SDK</Text>
            <Button
              title="set Event"
              onPress={() => setEventNameProperties("Sending dummy events")}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setEventNameProperties with callback - Tracks a named event and receives status update</Text>
            <Button
              title="set Event with cb"
              onPress={() => setEventNameProperties("Sending dummy events", (data: any) => {
                console.log("Event status update", data);
              })}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setEventProperties - Tracks an event with additional properties</Text>
            <Button
              title="set Event properties"
              onPress={() => setEventProperties("Sending dummy events", { test: "test" })}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setEventProperties with callback - Tracks an event with properties and receives status update</Text>
            <Button
              title="set Event properties cb"
              onPress={() => setEventProperties("Sending dummy events", { test: "test" }, (data: any) => {
                console.log("Event prop status update", data);
              })}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setInstantEventNameProperties - Instantly tracks a named event</Text>
            <Button
              title="set Instant Event"
              onPress={() => setInstantEventNameProperties("Sending dummy events")}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setInstantEventNameProperties with callback - Instantly tracks a named event and receives status update</Text>
            <Button
              title="set Instant Event with cb"
              onPress={() => setInstantEventNameProperties("Sending dummy events", (data: any) => {
                console.log("Instant Event status update", data);
              })}
            />
          </View>
        </Section>
        <Section title="Track User Identities">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setUserIdentities - Sets user identity information in the SDK</Text>
            <Button
              title="set user identities"
              onPress={() => setUserIdentities({ account_id: "123", household_id: "123" })}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>Set user Identities - Sets user identity with different keys</Text>
            <Button
              title="Set user Identities"
              onPress={() => setUserIdentities({
                householdId: "123",
                accountId: "1232523532",
              })}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>unsetUserIdentities - Removes user identity information from the SDK</Text>
            <Button
              title="unset Identities"
              onPress={() => unsetUserIdentities()}
            />
          </View>
        </Section>
        <Section title="Track User Properties">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setUserProperties - Sets user properties in the SDK</Text>
            <Button
              title="set user properties"
              onPress={() => setUserProperties({ theme: "dark" })}
            />
          </View>
        </Section>
        <Section title="Track Page Properties">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>setPageProperties - Sets page related properties in the SDK</Text>
            <Button
              title="set page properties"
              onPress={() => setPageProperties({ name: "test", component: "test-component" })}
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
