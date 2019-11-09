export default class Emitter {
  static SEPARATOR = ':';
  static ANY = 'any';

  constructor() {
    this.listeners = {};
  }

  on = (eventId, fn) => {
    const [name, id] = this.parse(eventId);
    if (this.listeners[name] === undefined) this.listeners[name] = [];
    this.listeners[name].push({ id, fn });
  };

  off = eventId => {
    const [name, id] = this.parse(eventId);
    if (this.listeners[name] === undefined) return;
    this.listeners = this.listeners[name].filter(
      listener => listener.id === id || listener.id === Emitter.ANY
    );
  };

  emit = (eventId, args) => {
    const [name, id] = this.parse(eventId);
    if (this.listeners[name] === undefined) return;
    this.listeners[name].forEach(listener => {
      if (listener.id === id || id === Emitter.ANY) listener.fn(args);
    });
  };

  parse = eventId => {
    const [name, id = Emitter.ANY] = eventId.split(Emitter.SEPARATOR);
    return [name, id];
  };
}
