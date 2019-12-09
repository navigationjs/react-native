import React from 'react';
import { View } from 'react-native';
import events from '@railsmob/events';
import { render } from '@testing-library/react-native';
import navigation from '@navigationjs/core';
import Wrap from '../../../src/Wrap';

describe('Wrap', () => {
  it('should match snapshot', async () => {
    const { baseElement } = render(
      <Wrap>
        <View />
      </Wrap>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should subscribe to lock and unlock', async () => {
    events.listeners = {};

    const { unmount } = render(
      <Wrap testID={'wrap'}>
        <View />
      </Wrap>
    );

    expect(events.listeners).toEqual({
      navigation_lock: [{ id: 'any', fn: expect.any(Function) }],
      navigation_unlock: [{ id: 'any', fn: expect.any(Function) }],
    });

    unmount();

    expect(events.listeners).toEqual({
      navigation_lock: [],
      navigation_unlock: [],
    });
  });

  it('should disable pointer events when navigation is locked', async () => {
    const { getByTestId } = render(
      <Wrap testID={'wrap'}>
        <View />
      </Wrap>
    );
    const component = getByTestId('wrap');
    expect(component.props.pointerEvents).toBe('auto');
    navigation.emit('lock');
    expect(component.props.pointerEvents).toBe('none');
    navigation.emit('unlock');
    expect(component.props.pointerEvents).toBe('auto');
  });
});
