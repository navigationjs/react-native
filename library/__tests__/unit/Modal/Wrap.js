import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Modal from '../../../src/Modal';
import navigation from '../../../src/Navigation';

describe('Modal.Wrap', () => {
  it('should match snapshot', async () => {
    const navigator = new Modal.Navigator('main');
    navigator.addScenes(new Modal.Scene('first'));
    navigation.addNavigators(navigator);
    const { baseElement } = render(
      <Modal.Wrap navigator={'main'} scene={'first'}>
        {props => <View {...props} />}
      </Modal.Wrap>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should remove all listeners from scene active on unmount', () => {
    const navigator = new Modal.Navigator('navigator');
    const scene = new Modal.Scene('scene');
    navigator.addScenes(scene);
    navigation.addNavigators(navigator);

    const { unmount } = render(
      <Modal.Wrap navigator={'navigator'} scene={'scene'}>
        {props => <View {...props} />}
      </Modal.Wrap>
    );

    scene.active.value = {
      removeAllListeners: jest.fn(),
    };
    unmount();
    expect(scene.active.value.removeAllListeners).toBeCalled();
  });

  describe('loading prop', () => {
    it('should be true by default', async () => {
      const navigator = new Modal.Navigator('main');
      navigator.addScenes(new Modal.Scene('first'));
      navigation.addNavigators(navigator);

      const { getByTestId } = render(
        <Modal.Wrap navigator={'main'} scene={'first'}>
          {props => <View testID={'scene'} {...props} />}
        </Modal.Wrap>
      );

      const component = getByTestId('scene');

      expect(component.props.loading).toBeTruthy();
    });

    it('should be false when scene is showed', async () => {
      const navigator = new Modal.Navigator('main');
      navigator.addScenes(new Modal.Scene('first'));
      navigation.addNavigators(navigator);

      const { getByTestId } = render(
        <Modal.Wrap navigator={'main'} scene={'first'}>
          {props => <View testID={'scene'} {...props} />}
        </Modal.Wrap>
      );

      const component = getByTestId('scene');

      await navigation.go('main', 'first');
      expect(component.props.loading).toBeFalsy();
    });
  });
});
