import React from 'react';

import {configure, shallow} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Card from './card';

configure({adapter: new Adapter()})

describe('<Card />', ()=> {
  let wrapper;

  beforeEach(()=> {
    // needs initial prop value for some props
    let listitems = [{ numbers: [] }]
    wrapper = shallow(<Card listitems={listitems}/>)
  })

  it('should render 3 numbers 123', ()=> {
    wrapper.setProps({ listitems: [{ numbers: [1, 2, 3] }] });

    expect(wrapper.find('li.numbers')).toHaveLength(3)
  })


  it('should render 0 numbers', ()=> {
    expect(wrapper.find('li.numbers')).toHaveLength(0)
  })

  it('should render correct numbers in li', ()=>{
    wrapper.setProps({ listitems: [{ numbers: [1, 2, 3] }], title: 'hi' });
    expect(wrapper.contains(<h5>Title: hi</h5>)).toEqual(true)
  })
})