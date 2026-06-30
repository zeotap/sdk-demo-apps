/**
 * Zeotap Collect SDK — emulator-free validation test.
 *
 * Mocks the native `zeo-collect` module and drives the harness UI entirely in
 * JavaScript (no device or emulator required). It verifies that every SDK
 * method is invoked with the expected arguments when its button is pressed —
 * i.e. that the JS ↔ SDK wiring works on THIS React Native version.
 *
 * Run with: `npm test`
 *
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {Button} from 'react-native';

// Mock the native SDK so no native runtime is needed. Callbacks are invoked
// synchronously so the harness's init -> "SDK initialized" flow completes.
jest.mock('zeo-collect', () => ({
  initialiseZeoCollect: jest.fn(
    (_config: any, cb?: (r: any) => void) => cb && cb({status: 'initialized'}),
  ),
  getZI: jest.fn((cb?: (r: any) => void) => {
    if (cb) {
      cb('zi-test-id');
    }
    return 'zi-test-id';
  }),
  setConsent: jest.fn(),
  setEventNameProperties: jest.fn(),
  setInstantEventNameProperties: jest.fn(),
  setEventProperties: jest.fn(
    (_n: any, _p: any, cb?: (r: any) => void) => cb && cb({status: 'ok'}),
  ),
  setUserIdentities: jest.fn(),
  unsetUserIdentities: jest.fn(),
  setUserProperties: jest.fn(),
  setPageProperties: jest.fn(),
  pauseCollection: jest.fn(),
}));

import App from '../App';
const Zeo = require('zeo-collect');

let renderer: any;

const render = () => {
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
};

const press = (title: string) => {
  const button = renderer.root.findAll(
    (node: any) => node.type === Button && node.props.title === title,
  )[0];
  if (!button) {
    throw new Error(`Button "${title}" not found in the current screen`);
  }
  ReactTestRenderer.act(() => {
    button.props.onPress();
  });
};

beforeEach(() => {
  jest.clearAllMocks();
  render();
});

describe('zeo-collect harness on this React Native version', () => {
  test('renders the consent screen', () => {
    const consentButtons = renderer.root.findAll(
      (n: any) => n.type === Button && n.props.title === 'Yes, I Consent',
    );
    expect(consentButtons.length).toBe(1);
  });

  test('initialises the SDK and reads the instance id on consent', () => {
    press('Yes, I Consent');
    expect(Zeo.initialiseZeoCollect).toHaveBeenCalledTimes(1);
    expect(Zeo.getZI).toHaveBeenCalledTimes(1);
    const config = Zeo.initialiseZeoCollect.mock.calls[0][0];
    expect(config).toHaveProperty('android_write_key');
    expect(config).toHaveProperty('ios_write_key');
  });

  test('pauses collection when consent is declined', () => {
    press('No, Decline');
    expect(Zeo.pauseCollection).toHaveBeenCalledTimes(1);
  });

  describe('after consent is granted', () => {
    beforeEach(() => press('Yes, I Consent'));

    test('setConsent', () => {
      press('set Consent');
      expect(Zeo.setConsent).toHaveBeenCalledWith({
        track: true,
        identify: true,
      });
    });

    test('setEventNameProperties', () => {
      press('set Event');
      expect(Zeo.setEventNameProperties).toHaveBeenCalledWith(
        'Sending dummy events',
      );
    });

    test('setEventProperties (with properties + callback)', () => {
      press('set Event properties');
      expect(Zeo.setEventProperties).toHaveBeenCalledWith(
        'Sending dummy events',
        {test: 'test'},
        expect.any(Function),
      );
    });

    test('setInstantEventNameProperties', () => {
      press('set Instant Event');
      expect(Zeo.setInstantEventNameProperties).toHaveBeenCalledWith(
        'Sending dummy events',
      );
    });

    test('setUserIdentities', () => {
      press('set user identities');
      expect(Zeo.setUserIdentities).toHaveBeenCalledWith({
        account_id: '123',
        household_id: '123',
      });
    });

    test('unsetUserIdentities', () => {
      press('unset Identities');
      expect(Zeo.unsetUserIdentities).toHaveBeenCalledTimes(1);
    });

    test('setUserProperties', () => {
      press('set user properties');
      expect(Zeo.setUserProperties).toHaveBeenCalledWith({theme: 'dark'});
    });

    test('setPageProperties', () => {
      press('set page properties');
      expect(Zeo.setPageProperties).toHaveBeenCalledWith({
        name: 'test',
        component: 'test-component',
      });
    });
  });
});
