import React from 'react';
import NavBar from './NavBar';
import { shallow } from 'enzyme';

describe('Nav Bar', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should toggle the menu when buttons are clicked', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.state()).toEqual({ isOpen: false });
    wrapper.find('.nav-bar__hamburger').simulate('click');
    wrapper.update();
    expect(wrapper.state()).toEqual({ isOpen: true });
  });
});
