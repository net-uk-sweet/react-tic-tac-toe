import Immutable from 'immutable';
import React from 'react';
import { mount, shallow } from 'enzyme';

import Board from './Board';

let shared;
let mockedClick;

beforeEach(() => {
    mockedClick = jest.fn();
    shared = {
        props: {
            winner: [0, 1, 2],
            squares: Immutable.fromJS(Array(9).fill(null)),
            columns: 3,
            onClick: mockedClick
        }
    }
    shared.wrapper = shallow(<Board {...shared.props} />);
});

it('matches snapshot', () => {
    expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('calls the onClick callback when a square is clicked with the correct index, row and column', () => {
    shared.wrapper = mount(<Board {...shared.props} />);
    shared.wrapper.find('button').at(0).simulate('click');
    expect(mockedClick).toHaveBeenCalledWith(0, 1, 1);
});
