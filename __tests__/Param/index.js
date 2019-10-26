import { Animated } from 'react-native'
import Param from '../../src/Param';

describe('Param', () => {
  it('should has a default value', () => {
    const param = new Param();
    expect(param._value).toBe(0)
  });

  it('should has a animated value', () => {
    const param = new Param(0.5);
    expect(param.value instanceof Animated.Value).toBe(true)
    expect(param.value._value).toBe(0.5)
  });

  it('should has a default duration', () => {
    const param = new Param();
    expect(param.duration).toBe(300)
  })

  it('should has loading depending on value', () => {
    const param1 = new Param(0);
    expect(param1.loading).toBe(true)
    const param2 = new Param(0.5);
    expect(param2.loading).toBe(true)
    const param3 = new Param(1);
    expect(param3.loading).toBe(false)
  })
});