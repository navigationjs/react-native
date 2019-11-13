export default class Events {
  static SEP = ':';
  static ANY = 'any';

  static id = (name, id) => `${name}${Events.SEP}${id}`;

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
    this.listeners[name] = this.listeners[name].filter(
      listener => listener.id !== id && id !== Events.ANY
    );
  };

  emit = (eventId, args) => {
    const [name, id] = this.parse(eventId);
    if (this.listeners[name] === undefined) return;
    this.listeners[name].forEach(listener => {
      if (listener.id === id || listener.id === Events.ANY || id === Events.ANY)
        listener.fn(args);
    });
  };

  parse = eventId => {
    const [name, id = Events.ANY] = eventId.split(Events.SEP);
    return [name, id];
  };
}
