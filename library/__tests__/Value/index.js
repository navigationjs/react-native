import { Animated } from 'react-native';
import navigation from '../../src/Navigation';
import Value from '../../src/Value';

describe('Value', () => {
  it('should has a name', () => {
    const value = new Value('value');
    expect(value.name).toBe('value');
  });

  it('should has a default value', () => {
    const value = new Value('value');
    expect(value._value).toBe(0);
  });

  it('should has a animated value', () => {
    const value = new Value('value', 0.5);
    expect(value.value instanceof Animated.Value).toBeTruthy();
    expect(value.value._value).toBe(0.5);
  });

  it('should has a default duration', () => {
    const value = new Value('value');
    expect(value.duration).toBe(300);
  });

  describe('.to', () => {
    it('should change values on `to` method', async () => {
      const value = new Value('value', 0);
      expect(value._value).toBe(0);
      await value.to(0.5);
      expect(value._value).toBe(0.5);
      await value.to(1);
      expect(value._value).toBe(1);
    });

    it('should emit event on start and end of animation', async () => {
      const value = new Value('value', 0);
      const start = jest.fn()
      const end = jest.fn()
      navigation.on('animation_start:value', start)
      navigation.on('animation_end:value', end)
      await value.to(1)
      expect(start).toBeCalled();
      expect(end).toBeCalled();
    })
  })
});
