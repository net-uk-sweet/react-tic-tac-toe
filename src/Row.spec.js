import React from 'react';
import { mount, shallow } from 'enzyme';

import Row from './Row';
import Square from './Square';

let shared;

beforeEach(() => {
    shared = {
        children: [
            mount(<Square key='1' />),
            mount(<Square key='2' />),
            mount(<Square key='3' />)
        ]
    }
    shared.wrapper = shallow(<Row {...shared} />);
});

it('matches snapshot', () => {
    expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('renders it\s children', () => {
    expect(shared.wrapper.find('Square').length).toEqual(3);
});
