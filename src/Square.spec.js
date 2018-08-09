import React from 'react';
import { shallow } from 'enzyme';

import Square from './Square';

let shared;
let mockedClick;

beforeEach(() => {
    mockedClick = jest.fn();
    shared = {
        props: {
            value: 'x',
            highlight: false,
            onClick: mockedClick
        }
    }
    shared.wrapper = shallow(<Square {...shared.props} />);
});

it('matches snapshot', () => {
    expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('highlights when part of a winning sequence', () => {
    shared.props.highlight = true;
    shared.wrapper = shallow(<Square {...shared.props} />).getElement();

    expect(shared.wrapper).toMatchSnapshot();
});

it('it calls the onClick callback when clicked', () => {
    shared.wrapper.find('button').simulate('click');
    expect(mockedClick).toHaveBeenCalled();
});
