import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import HelloWorldList from './HelloWorldList';
import AddGreeter from './AddGreeter';
import HelloWorld from './HelloWorld';

describe(HelloWorldList, () => {
  const component = shallow(
    <HelloWorldList />
  );

  //add the rest of the tests here
  it('renders and matches our snapshot', () => {
    const component = renderer.create(
      <HelloWorldList />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains an AddGreeter subcomponent', () => {
    expect(component.find(AddGreeter)).toHaveLength(1);
  });

  it('contains the same number of HelloWorld components as greetings', () => {
    const helloWorlds = component.find(HelloWorld).length;
    const greetings = component.state('greetings').length;
    expect(helloWorlds).toEqual(greetings);
  });

  it('adds another greeting when the addGreeting function is called', () => {
    const before = component.find(HelloWorld).length;
    component.instance().addGreeting('Sample');
    component.update();
    const after = component.find(HelloWorld).length;
    expect(after).toBeGreaterThan(before);
  });

  it('removes a greeting when the removeGreeting function is called', () => {
    const before = component.find(HelloWorld).length;
    const removeMe = component.state('greetings')[0];
    component.instance().removeGreeting(removeMe);
    component.update();
    const after = component.find(HelloWorld).length;
    expect(after).toBeLessThan(before);
  });
});
