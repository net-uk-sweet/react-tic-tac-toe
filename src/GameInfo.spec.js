import React from 'react';
import Immutable  from 'immutable';
import { mount, shallow } from 'enzyme';

import GameInfo from './GameInfo';

let shared;
let mockedClick;

beforeEach(() => {
    mockedClick = jest.fn();
    shared = {
        startLabel: 'Go to start',
        props: {
            history: Immutable.fromJS([
                {
                    "squares": [
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    }
                    ]
                },
                {
                    "index": 0,
                    "squares": [
                    {
                        "token": "x",
                        "row": 1,
                        "column": 1
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    }
                    ]
                },
                {
                    "index": 4,
                    "squares": [
                    {
                        "token": "x",
                        "row": 1,
                        "column": 1
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 2
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    }
                    ]
                },
                {
                    "index": 2,
                    "squares": [
                    {
                        "token": "x",
                        "row": 1,
                        "column": 1
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "x",
                        "row": 1,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 2
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    }
                    ]
                },
                {
                    "index": 5,
                    "squares": [
                    {
                        "token": "x",
                        "row": 1,
                        "column": 1
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "x",
                        "row": 1,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 2
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    }
                    ]
                },
                {
                    "index": 8,
                    "squares": [
                    {
                        "token": "x",
                        "row": 1,
                        "column": 1
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "x",
                        "row": 1,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 2
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "x",
                        "row": 3,
                        "column": 3
                    }
                    ]
                },
                {
                    "index": 7,
                    "squares": [
                    {
                        "token": "x",
                        "row": 1,
                        "column": 1
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "x",
                        "row": 1,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 2
                    },
                    {
                        "token": "o",
                        "row": 2,
                        "column": 3
                    },
                    {
                        "token": null,
                        "column": null,
                        "row": null
                    },
                    {
                        "token": "o",
                        "row": 3,
                        "column": 2
                    },
                    {
                        "token": "x",
                        "row": 3,
                        "column": 3
                    }
                    ]
                }
            ]),
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
