import { toId } from '../helpers';

const Focus = (handler, source) => {
  const { navigator, scene } = source;
  Focus.handlers[toId(navigator, scene)] = handler;
  return handler;
};

Focus.handlers = {};

export default Focus;
