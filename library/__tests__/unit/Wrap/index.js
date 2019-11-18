import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Wrap from '../../../src/Wrap';
import navigation from '../../../src/Navigation';
import Value from '../../../src/Value';

describe('Wrap', () => {
  it('should match snapshot', async () => {
    const { baseElement } = render(
      <Wrap>
        <View />
      </Wrap>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should subscribe to animation_start and animation_end', async () => {
    navigation.events.listeners = {};

    const { unmount } = render(
      <Wrap testID={'wrap'}>
        <View />
      </Wrap>
    );

    expect(navigation.events.listeners).toEqual({
      animation_start: [{ id: 'any', fn: expect.any(Function) }],
      animation_end: [{ id: 'any', fn: expect.any(Function) }],
    });

    unmount();

    expect(navigation.events.listeners).toEqual({
      animation_start: [],
      animation_end: [],
    });
  });

  it('should disable pointer events during animation any values', async () => {
    const { getByTestId } = render(
      <Wrap testID={'wrap'}>
        <View />
      </Wrap>
    );
    const component = getByTestId('wrap');
    const value1 = new Value('value1', 0);
    const value2 = new Value('value2', 0);

    expect.assertions(5);
    expect(component.props.pointerEvents).toBe('auto');

    const value1Start = new Promise(resolve => {
      navigation.on('animation_start:value1', () => {
        expect(component.props.pointerEvents).toBe('none');
        resolve();
      });
    });

    const value1End = new Promise(resolve => {
      navigation.on('animation_end:value1', () => {
        expect(component.props.pointerEvents).toBe('none');
        resolve();
      });
    });

    const value2Start = new Promise(resolve => {
      navigation.on('animation_start:value2', () => {
        expect(component.props.pointerEvents).toBe('none');
        resolve();
      });
    });

    const value2End = new Promise(resolve => {
      navigation.on('animation_end:value2', () => {
        expect(component.props.pointerEvents).toBe('auto');
        resolve();
      });
    });

    await Promise.all([value1.to(1, 100), value2.to(1, 200)]);
    await Promise.all([value1Start, value1End, value2Start, value2End]);
  });
});
