import { Animated } from 'react-native';
import Value from '../../src/Value';

describe('Value', () => {
  it('should has a default value', () => {
    const value = new Value();
    expect(value._value).toBe(0);
  });

  it('should has a animated value', () => {
    const value = new Value(0.5);
    expect(value.value instanceof Animated.Value).toBeTruthy();
    expect(value.value._value).toBe(0.5);
  });

  it('should has a default duration', () => {
    const value = new Value();
    expect(value.duration).toBe(300);
  });

  it('should has loading depending on value', () => {
    const value1 = new Value(0);
    expect(value1.loading).toBeTruthy();
    const value2 = new Value(0.5);
    expect(value2.loading).toBeTruthy();
    const value3 = new Value(1);
    expect(value3.loading).toBeFalsy();
  });

  it('should change values on `to` method', async () => {
    const value = new Value(0);
    expect(value._value).toBe(0);
    await value.to(0.5);
    expect(value._value).toBe(0.5);
    await value.to(1);
    expect(value._value).toBe(1);
  });

  it('should change loading when value hits 1 or 0', async () => {
    const value = new Value(0);
    expect(value.loading).toBeTruthy();
    await value.to(0.7);
    expect(value.loading).toBeTruthy();
    await value.to(1);
    expect(value.loading).toBeFalsy();
    await value.to(0.3);
    expect(value.loading).toBeFalsy();
    await value.to(0);
    expect(value.loading).toBeTruthy();
  });
});
