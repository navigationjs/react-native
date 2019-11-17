import Events from '../../../src/Events';

describe('Events', () => {
  it('should has a static id method', () => {
    expect(Events.id('hello', 'world')).toBe('hello:world');
  });

  it('should has listeners as an empty object', () => {
    const events = new Events();
    expect(events.listeners).toEqual({});
  });

  it('should has a sepatator', () => {
    expect(Events.SEP).toBe(':');
  });

  it('should has any event', () => {
    expect(Events.ANY).toBe('any');
  });

  describe('.on', () => {
    it('should add listener with name parsed from eventId', () => {
      const events = new Events();
      expect(events.listeners).toEqual({});
      const id = 'id';
      const fn = () => {};
      events.on(`focus:${id}`, fn);
      expect(events.listeners).toEqual({
        focus: [{ id, fn }],
      });
    });

    it('should add any listener', () => {
      const events = new Events();
      expect(events.listeners).toEqual({});
      const fn = () => {};
      events.on('focus', fn);
      expect(events.listeners).toEqual({
        focus: [{ id: Events.ANY, fn }],
      });
    });
  });

  describe('.off', () => {
    it('should return if no listeners found', () => {
      const events = new Events();
      expect(events.off('hello')).toBeUndefined();
    });

    it('should remove listener by eventId', () => {
      const events = new Events();

      const fn1 = () => {};
      const fn2 = () => {};
      const fn3 = () => {};

      events.listeners.blur = [
        { id: '1', fn: fn1 },
        { id: '2', fn: fn2 },
        { id: Events.ANY, fn: fn3 },
      ];

      events.listeners.focus = [
        { id: '3', fn: fn1 },
        { id: '4', fn: fn2 },
        { id: Events.ANY, fn: fn3 },
      ];

      events.off('focus:3');
      expect(events.listeners.focus).toEqual([
        { id: '4', fn: fn2 },
        { id: Events.ANY, fn: fn3 },
      ]);

      events.off('focus');
      expect(events.listeners.focus).toEqual([]);

      events.off('blur:2');
      expect(events.listeners.blur).toEqual([
        { id: '1', fn: fn1 },
        { id: Events.ANY, fn: fn3 },
      ]);

      events.off('blur');
      expect(events.listeners.blur).toEqual([]);
    });
  });

  describe('.parse', () => {
    it('should parse eventId into name and id', () => {
      const events = new Events();
      expect(events.parse('focus:1')).toEqual(['focus', '1']);
      expect(events.parse('focus')).toEqual(['focus', Events.ANY]);
    });
  });

  describe('.emit', () => {
    it('should run all listeners with corresponding id', () => {
      const events = new Events();

      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const fn3 = jest.fn();

      events.listeners.focus = [
        { id: '1', fn: fn1 },
        { id: '2', fn: fn2 },
        { id: Events.ANY, fn: fn3 },
      ];

      events.emit('focus:1');
      expect(fn1).toBeCalled();
      expect(fn2).not.toBeCalled();
      expect(fn3).toBeCalled();

      events.emit('focus:2');
      expect(fn2).toBeCalled();
    });

    it('should run all listeners with corresponding event name', () => {
      const events = new Events();

      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const fn3 = jest.fn();

      events.listeners.focus = [
        { id: '1', fn: fn1 },
        { id: '2', fn: fn2 },
        { id: Events.ANY, fn: fn3 },
      ];

      events.emit('focus');
      expect(fn1).toBeCalled();
      expect(fn2).toBeCalled();
      expect(fn3).toBeCalled();
    });
  });
});
