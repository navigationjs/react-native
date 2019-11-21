import { Navigation } from '../../../src/Navigation';

describe('navigation', () => {
  it('should has a navigators as an empty object', () => {
    const navigation = new Navigation();
    expect(navigation.navigators).toEqual({});
  });

  it('should has static EVENTS list', () => {
    expect(Navigation.EVENTS).toEqual({
      LOCK: 'lock',
      UNLOCK: 'unlock',
      WILL_BLUR: 'will_blur',
      BLUR: 'blur',
      WILL_FOCUS: 'will_focus',
      FOCUS: 'focus',
      ANDROID_BACK: 'android_back',
    });
  });
});
