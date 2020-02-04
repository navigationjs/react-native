import { Animated } from 'react-native';
import Value from '../../../src/Value';

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

  it('should has a default easing', () => {
    const value = new Value('value');
    expect(value.easing).toBeDefined();
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
  });
});
