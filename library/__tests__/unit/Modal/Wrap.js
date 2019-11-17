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

  it('should render overlay view if overlay prop passed', () => {
    const navigator = new Modal.Navigator('main');
    navigator.addScenes(new Modal.Scene('first'));
    navigation.addNavigators(navigator);
    const { baseElement } = render(
      <Modal.Wrap overlay navigator={'main'} scene={'first'}>
        {props => <View {...props} />}
      </Modal.Wrap>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should render backgroundColor transparent if transparent prop passed', () => {
    const navigator = new Modal.Navigator('main');
    navigator.addScenes(new Modal.Scene('first'));
    navigation.addNavigators(navigator);
    const { baseElement } = render(
      <Modal.Wrap transparent navigator={'main'} scene={'first'}>
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

    it('should be false when scene is showed and true when hidden', async () => {
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
      await navigation.back();
      expect(component.props.loading).toBeTruthy();
    });

    it('should pass id and loading props to children if children if function', () => {
      const navigator = new Modal.Navigator('main');
      navigator.addScenes(new Modal.Scene('first'));
      navigation.addNavigators(navigator);

      const { getByTestId } = render(
        <>
          <Modal.Wrap navigator={'main'} scene={'first'}>
            {props => <View testID={'scene1'} {...props} />}
          </Modal.Wrap>
          <Modal.Wrap navigator={'main'} scene={'first'}>
            <View testID={'scene2'} />}
          </Modal.Wrap>
        </>
      );

      const scene1 = getByTestId('scene1');
      expect(scene1.props.id).toBe('main/first');
      expect(scene1.props.loading).toBeTruthy();

      const scene2 = getByTestId('scene2');
      expect(scene2.props.id).not.toBeDefined();
      expect(scene2.props.loading).not.toBeDefined();
    });
  });
});
