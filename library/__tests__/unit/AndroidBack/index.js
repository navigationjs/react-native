import React from 'react';
import { render } from '@testing-library/react-native';
import navigation from '@navigationjs/core';
import AndroidBack from '../../../src/AndroidBack';

describe('AndroidBack', () => {
  it('should match snapshot', async () => {
    const { baseElement } = render(
      <AndroidBack id={'example'} onPress={() => {}} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should subscribe onPress to android_back event', async () => {
    const onPress = jest.fn();
    const { unmount } = render(
      <AndroidBack id={'example'} onPress={onPress} />
    );
    await navigation.androidBack('example');
    expect(onPress).toHaveBeenCalledTimes(1);
    unmount();
    await navigation.androidBack('example');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
