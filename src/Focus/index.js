import { toKey } from '../helpers';

const Focus = (handler, source) => {
  const { navigator, scene } = source;
  Focus.handlers[toKey(navigator, scene)] = handler;
  return handler;
};

Focus.handlers = {};

export default Focus;
