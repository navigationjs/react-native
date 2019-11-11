import {
  Navigation as navigation,
  Tab,
  Modal,
  Stack,
} from 'react-native-animated-navigation';

export const preloader = new Modal.Navigator('preloader');
preloader.addScenes(new Modal.Scene('main'));

export const main = new Tab.Navigator('main');

main.addScenes(
  new Tab.Scene('first'),
  new Tab.Scene('second'),
  new Tab.Scene('third'),
  new Tab.Scene('fourth'),
);

export const first = new Stack.Navigator('first');

first.addScenes(new Stack.Scene('first'), new Stack.Scene('second'));

export const second = new Stack.Navigator('second');

second.addScenes(new Stack.Scene('first'), new Stack.Scene('second'));

navigation.addNavigators(preloader, main, first, second);

export default navigation;
