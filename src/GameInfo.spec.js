import React from 'react';
import { shallow } from 'enzyme';

import { dirtyState } from './dirtyState';
import GameInfo from './GameInfo';

let shared;
let mockedClick;

beforeEach(() => {
    mockedClick = jest.fn();
    shared = {
        startLabel: 'Go to start',
        props: {
            history: dirtyState.history,
            currentMove: 2,
            ascendingOrder: true,
            onMoveClick: mockedClick
        }
    }
    shared.wrapper = shallow(<GameInfo {...shared.props} />);
});

it('matches snapshot', () => {
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('highlights the current move', () => {
    const currentMove = shared.wrapper.find('li').at(shared.props.currentMove);
    expect(currentMove.hasClass('qa-selected')).toBeTruthy();
});

it('labels the first move correctly', () => {
    expect(shared.wrapper.find('li').at(0).text()).toEqual(shared.startLabel);
})

it('calls the click handler when a button is selected', () => {
   shared.wrapper.find('button').at(2).simulate('click');
   expect(mockedClick).toHaveBeenCalledWith(2); 
});

describe('when the move order is reversed', () => {
    beforeEach(() => {
        const props = Object.assign(shared.props, { ascendingOrder: false });
        shared.historySize = shared.props.history.size;
        shared.wrapper = shallow(<GameInfo {...props} />);
    });

    it('matches snapshot', () => {
        expect(shared.wrapper.getElement()).toMatchSnapshot();
    });

    it('highlights the current move', () => {
        const index = shared.historySize - 1 - shared.props.currentMove;
        const currentMove = shared.wrapper.find('li').at(index);
        expect(currentMove.hasClass('qa-selected')).toBeTruthy();
    });

    it('labels the first move correctly', () => {
        expect(shared.wrapper.find('li').at(shared.historySize - 1).text()).toEqual(shared.startLabel);
    });
});
