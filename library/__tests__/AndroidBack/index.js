import React from 'react';
import { render } from '@testing-library/react-native';
import AndroidBack from '../../src/AndroidBack';

describe('AndroidBack', () => {
  it('should match snapshot', async () => {
    const { baseElement } = render(
      <AndroidBack id={'example'} onPress={() => {}} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
