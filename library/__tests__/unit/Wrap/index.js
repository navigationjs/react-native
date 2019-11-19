import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Wrap from '../../../src/Wrap';
import navigation from '../../../src/Navigation';

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
    navigation.events.listeners = {};

    const { unmount } = render(
      <Wrap testID={'wrap'}>
        <View />
      </Wrap>
    );

    expect(navigation.events.listeners).toEqual({
      lock: [{ id: 'any', fn: expect.any(Function) }],
      unlock: [{ id: 'any', fn: expect.any(Function) }],
    });

    unmount();

    expect(navigation.events.listeners).toEqual({
      lock: [],
      unlock: [],
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
    navigation.events.emit('lock');
    expect(component.props.pointerEvents).toBe('none');
    navigation.events.emit('unlock');
    expect(component.props.pointerEvents).toBe('auto');
  });
});
