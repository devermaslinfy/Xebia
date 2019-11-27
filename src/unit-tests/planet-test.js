import React from 'react';
import { shallow } from 'enzyme';
import Planets from '../components/planet/planet-component'
describe("ComponentName", () => {
  it("should render my component", () => {
    const wrapper = shallow(<Planets />);
  });