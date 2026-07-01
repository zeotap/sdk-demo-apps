/**
 * Zeotap Collect SDK — Function Test Harness
 *
 * A single-screen app that exercises every `zeo-collect` API method so that
 * customers (and we) can validate the SDK behaves as expected on this exact
 * React Native version. Every button calls one SDK method.
 *
 * Two layers of validation are built in:
 *   1. JS wiring   — `npm test` (Jest) mocks the SDK and asserts each method is
 *                    called with the right arguments. No device needed.
 *   2. Runtime     — every action logs a `[ZEOTAP-HARNESS]` marker, and the SDK
 *                    is initialised with `logging: true` so the native Zeotap
 *                    SDK emits its own processing/network logs. The runtime
 *                    validation scripts drive the app (Maestro) and assert these
 *                    markers + native SDK/network log lines appear.
 *
 * This file is intentionally self-contained: it does NOT import from
 * `react-native/Libraries/NewAppScreen`, so the same harness compiles and runs
 * unchanged across RN 0.73 → 0.86.
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  initialiseZeoCollect,
  setEventNameProperties,
  setConsent,
  setInstantEventNameProperties,
  setEventProperties,
  setUserIdentities,
  unsetUserIdentities,
  setPageProperties,
  setUserProperties,
  getZI,
  pauseCollection,
} from 'zeo-collect';

// Self-contained colour palette (replaces react-native/Libraries/NewAppScreen).
const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  light: '#DAE1E7',
  dark: '#444444',
  lighter: '#F3F3F3',
  darker: '#222222',
};

// Replace with your Zeotap CDP source write key(s).
const ANDROID_WRITE_KEY = '1189a077-6cee-42c8-8195-bb37982b7866';
const IOS_WRITE_KEY = '1189a077-6cee-42c8-8195-bb37982b7866';

// Emit a greppable marker for every SDK call so the runtime validation scripts
// can assert (via logcat / os_log) that each function actually ran.
const mark = (method: string) => console.log(`[ZEOTAP-HARNESS] ${method}`);

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
      <View
        style={[
          styles.sectionDescription,
        ]}>
        {children}
      </View>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [sdkInitialized, setSdkInitialized] = useState(false);

  const handleConsentYes = () => {
    setConsentGiven(true);
    mark('initialiseZeoCollect');
    initialiseZeoCollect(
      {
        android_write_key: ANDROID_WRITE_KEY,
        ios_write_key: IOS_WRITE_KEY,
        // Turn on the native Zeotap SDK's own logging so its event-processing
        // and network/upload activity is visible in logcat / Xcode console.
        batch_size: 15,
        logging: true,
      },
      (response: any) => {
        console.log('[ZEOTAP-HARNESS] initialised:callback', response);
        setSdkInitialized(true);
      },
    );
    mark('getZI');
    getZI((response: any) => {
      console.log('[ZEOTAP-HARNESS] getZI:callback', response);
    });
  };

  const handleConsentNo = () => {
    setConsentGiven(false);
    mark('pauseCollection');
    pauseCollection();
  };

  const handleSetInstantEvent = () => {
    mark('setInstantEventNameProperties');
    setInstantEventNameProperties('Sending dummy events');
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Show consent screen if consent hasn't been given yet
  if (consentGiven === null) {
    return (
      <SafeAreaView style={[backgroundStyle, styles.consentContainer]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={styles.consentContent}>
          <Text
            style={[
              styles.consentTitle,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}>
            Data Collection Consent
          </Text>
          <Text
            style={[
              styles.consentDescription,
              { color: isDarkMode ? Colors.light : Colors.dark },
            ]}>
            We use Zeotap SDK to collect analytics data to improve your
            experience. Do you consent to data collection?
          </Text>
          <View style={styles.consentButtons}>
            <View style={styles.buttonWrapper}>
              <Button
                testID="consent-yes"
                title="Yes, I Consent"
                onPress={handleConsentYes}
                color="#4CAF50"
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                testID="consent-no"
                title="No, Decline"
                onPress={handleConsentNo}
                color="#f44336"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
          {consentGiven
            ? sdkInitialized
              ? 'SDK initialized - tap the buttons below to exercise each zeo-collect API method.'
              : 'Initializing SDK…'
            : 'Data collection paused - You declined consent'}
        </Section>
        <Section title="Tracking Consent">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setConsent - Helps application to pass the user consent to SDK
            </Text>
            <Button
              testID="set-consent"
              title="set Consent"
              onPress={() => {
                mark('setConsent');
                setConsent({
                  track: true,
                  identify: true,
                });
              }}
            />
          </View>
        </Section>
        <Section title="Track Events">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setEventNameProperties - Tracks a named event in the SDK
            </Text>
            <Button
              testID="set-event"
              title="set Event"
              onPress={() => {
                mark('setEventNameProperties');
                setEventNameProperties('Sending dummy events');
              }}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setEventNameProperties with callback - Tracks a named event and
              receives status update
            </Text>
            <Button
              testID="set-event-cb"
              title="set Event with cb"
              onPress={() => {
                mark('setEventNameProperties:cb');
                setEventNameProperties('Sending dummy events', (data: any) => {
                  console.log('[ZEOTAP-HARNESS] setEventNameProperties:cb', data);
                });
              }}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setEventProperties - Tracks an event with additional properties
            </Text>
            <Button
              testID="set-event-props"
              title="set Event properties"
              onPress={() => {
                mark('setEventProperties');
                setEventProperties(
                  'Sending dummy events',
                  { test: 'test' },
                  (response: any) => {
                    console.log('[ZEOTAP-HARNESS] setEventProperties:cb', response);
                  },
                );
              }}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setEventProperties with callback - Tracks an event with properties
              and receives status update
            </Text>
            <Button
              testID="set-event-props-cb"
              title="set Event properties cb"
              onPress={() => {
                mark('setEventProperties:cb');
                setEventProperties(
                  'Sending dummy events',
                  { test: 'test' },
                  (data: any) => {
                    console.log('[ZEOTAP-HARNESS] setEventProperties:cb2', data);
                  },
                );
              }}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setInstantEventNameProperties - Instantly tracks a named event
            </Text>
            <Button
              testID="set-instant-event"
              title="set Instant Event"
              onPress={handleSetInstantEvent}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setInstantEventNameProperties with callback - Instantly tracks a
              named event and receives status update
            </Text>
            <Button
              testID="set-instant-event-cb"
              title="set Instant Event with cb"
              onPress={() => {
                console.log('[ZEOTAP-HARNESS] setInstantEventNameProperties:cb:before');
                mark('setInstantEventNameProperties:cb');
                setInstantEventNameProperties(
                  'Sending dummy events',
                  (data: any) => {
                    console.log(
                      '[ZEOTAP-HARNESS] setInstantEventNameProperties:cb',
                      data,
                    );
                  },
                );
              }}
            />
          </View>
        </Section>
        <Section title="Track User Identities">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setUserIdentities - Sets user identity information in the SDK
            </Text>
            <Button
              testID="set-user-identities"
              title="set user identities"
              onPress={() => {
                mark('setUserIdentities');
                setUserIdentities({ account_id: '123', household_id: '123' });
              }}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              Set user Identities - Sets user identity with different keys
            </Text>
            <Button
              testID="set-user-identities-alt"
              title="Set user Identities"
              onPress={() => {
                mark('setUserIdentities:alt');
                setUserIdentities({
                  householdId: '123',
                  accountId: '1232523532',
                });
              }}
            />
          </View>
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              unsetUserIdentities - Removes user identity information from the
              SDK
            </Text>
            <Button
              testID="unset-identities"
              title="unset Identities"
              onPress={() => {
                mark('unsetUserIdentities');
                unsetUserIdentities();
              }}
            />
          </View>
        </Section>
        <Section title="Track User Properties">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setUserProperties - Sets user properties in the SDK
            </Text>
            <Button
              testID="set-user-properties"
              title="set user properties"
              onPress={() => {
                mark('setUserProperties');
                setUserProperties({ theme: 'dark' });
              }}
            />
          </View>
        </Section>
        <Section title="Track Page Properties">
          <View style={{ paddingBottom: 12 }}>
            <Text style={{ marginBottom: 4 }}>
              setPageProperties - Sets page related properties in the SDK
            </Text>
            <Button
              testID="set-page-properties"
              title="set page properties"
              onPress={() => {
                mark('setPageProperties');
                setPageProperties({ name: 'test', component: 'test-component' });
              }}
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
  consentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consentContent: {
    paddingHorizontal: 24,
    maxWidth: 500,
  },
  consentTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  consentDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  consentButtons: {
    gap: 16,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
});

export default App;
