import Emitter from '../../src/navigation/Emitter';

describe('Emitter', () => {
  it('should has listeners as an empty object', () => {
    const emitter = new Emitter();
    expect(emitter.listeners).toEqual({});
  });

  it('should has a sepatator', () => {
    expect(Emitter.SEPARATOR).toBe(':');
  });

  it('should has any event', () => {
    expect(Emitter.ANY).toBe('any');
  });

  describe('.on', () => {
    it('should add listener with name parsed from eventId', () => {
      const emitter = new Emitter();
      expect(emitter.listeners).toEqual({});
      const id = 'id';
      const fn = () => {};
      emitter.on(`focus:${id}`, fn);
      expect(emitter.listeners).toEqual({
        focus: [{ id, fn }],
      });
    });

    it('should add any listener', () => {
      const emitter = new Emitter();
      expect(emitter.listeners).toEqual({});
      const fn = () => {};
      emitter.on('focus', fn);
      expect(emitter.listeners).toEqual({
        focus: [{ id: Emitter.ANY, fn }],
      });
    });
  });

  describe('.off', () => {
    it('should remove listener by eventId', () => {
      const emitter = new Emitter();

      const fn1 = () => {};
      const fn2 = () => {};
      const fn3 = () => {};

      emitter.listeners.blur = [
        { id: '1', fn: fn1 },
        { id: '2', fn: fn2 },
        { id: Emitter.ANY, fn: fn3 },
      ];

      emitter.listeners.focus = [
        { id: '3', fn: fn1 },
        { id: '4', fn: fn2 },
        { id: Emitter.ANY, fn: fn3 },
      ];

      emitter.off('focus:3');
      expect(emitter.listeners.focus).toEqual([
        { id: '4', fn: fn2 },
        { id: Emitter.ANY, fn: fn3 },
      ]);

      emitter.off('focus');
      expect(emitter.listeners.focus).toEqual([]);

      emitter.off('blur:2');
      expect(emitter.listeners.blur).toEqual([
        { id: '1', fn: fn1 },
        { id: Emitter.ANY, fn: fn3 },
      ]);

      emitter.off('blur');
      expect(emitter.listeners.blur).toEqual([]);
    });
  });

  describe('.parse', () => {
    it('should parse eventId into name and id', () => {
      const emitter = new Emitter();
      expect(emitter.parse('focus:1')).toEqual(['focus', '1']);
      expect(emitter.parse('focus')).toEqual(['focus', Emitter.ANY]);
    });
  });

  describe('.emit', () => {
    it('should run all listeners with corresponding id', () => {
      const emitter = new Emitter();

      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const fn3 = jest.fn();

      emitter.listeners.focus = [
        { id: '1', fn: fn1 },
        { id: '2', fn: fn2 },
        { id: Emitter.ANY, fn: fn3 },
      ];

      emitter.emit('focus:1');
      expect(fn1).toBeCalled();
      expect(fn2).not.toBeCalled();
      expect(fn3).toBeCalled();

      emitter.emit('focus:2');
      expect(fn2).toBeCalled();
    });

    it('should run all listeners with corresponding event name', () => {
      const emitter = new Emitter();

      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const fn3 = jest.fn();

      emitter.listeners.focus = [
        { id: '1', fn: fn1 },
        { id: '2', fn: fn2 },
        { id: Emitter.ANY, fn: fn3 },
      ];

      emitter.emit('focus');
      expect(fn1).toBeCalled();
      expect(fn2).toBeCalled();
      expect(fn3).toBeCalled();
    });
  });
});
