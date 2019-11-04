import { toId } from '../helpers';
import navigation from '../Navigation';

const Back = (handler, source) => {
  const { navigator, scene } = source;
  Back.handlers[toId(navigator, scene)] = handler;
  return handler;
};

Back.handlers = {};

Back.back = () => {
  const navigatorName = navigation.current();
  if (!navigatorName) return true;
  const navigator = navigation.navigators[navigatorName];
  if (!navigator) return true;
  const sceneName = navigator.current();
  const id = toId(navigatorName, sceneName);
  if (!Back.handlers[id]) return true;
  Back.handlers[id]();
  return true;
};

export default Back;
