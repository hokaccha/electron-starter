import * as React from 'react';
import * as sinon from 'sinon';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as assert from 'assert';
import Button from './Button';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('handle click', () => {
    const onClick = sinon.spy();
    const wrapper = Enzyme.shallow(<Button onClick={onClick} />);
    wrapper.simulate('click');
    assert.equal(onClick.callCount, 1);
  });
});
