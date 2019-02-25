import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';

describe('Login', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });
});
