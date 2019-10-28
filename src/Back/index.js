import { toKey } from '../helpers';
import navigation from '../Navigation';

const Back = (handler, source) => {
  const { navigator, scene } = source;
  Back.handlers[toKey(navigator, scene)] = handler;
  return handler;
};

Back.handlers = {};

Back.back = () => {
  const navigatorName = navigation.current();
  if (!navigatorName) return true;
  const navigator = navigation.navigators[navigatorName];
  if (!navigator) return true;
  const sceneName = navigator.current();
  const key = toKey(navigatorName, sceneName);
  if (!Back.handlers[key]) return true;
  Back.handlers[key]();
  return true;
};

export default Back;
