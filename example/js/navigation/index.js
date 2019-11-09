import {
  Navigation as navigation,
  Tab,
  Modal,
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

navigation.addNavigators(preloader, main);

export default navigation;
