import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PartCardContainer} from './PartCardContainer';
import LoadingPartCard from '../../components/parts/LoadingPartCard';
import PartCard from '../../components/parts/PartCard';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('PartCardPage Container Component', () => {
    let props;
    let mountedPartCard;
    const partCard = () => {
        if (!mountedPartCard) {
            const router = mount(
                <MemoryRouter>
                    <PartCardContainer {...props} />
                </MemoryRouter>
            );
            mountedPartCard = router.find(PartCardContainer).first();
        }
        return mountedPartCard;
    };

    beforeEach(() => {
        // includes required props
        props = {
            partNum: '1545',
            part: undefined,
            dispatch: jest.fn(),
            getSinglePart: jest.fn()
        };
        mountedPartCard = undefined;
    });

    describe('when part is undefined', () => {
        describe('render', () => {
            it('should render a LoadingPartCard', () => {
                expect(partCard().find(LoadingPartCard).length).toEqual(1);
            });

            it('should not render a PartCard', () => {
                expect(partCard().find(PartCard).length).toEqual(0);
            });
        });

        describe('componentDidMount', () => {
            it('should call the provided `getSinglePart` function', () => {
                partCard();
                expect(props.getSinglePart).toHaveBeenCalledTimes(1);
            });

            it('should dispatch an action once using the results of calling `getSinglePart`', () => {
                const actionObject = {type: 'asdf'};
                props.getSinglePart.mockReturnValue(actionObject);
                partCard();
                expect(props.dispatch).toHaveBeenCalledTimes(1);
                expect(props.dispatch).toHaveBeenCalledWith(actionObject);
            });
        });
    });

    describe('when part is defined', () => {
        beforeEach(() => {
            props.part = {
                part_num: '1545',
                name: '2 x 2 Brick'
            }
        });

        describe('render', () => {
            it('should render a PartCard', () => {
                expect(partCard().find(PartCard).length).toEqual(1);
            });

            it('should not render a LoadingPartCard', () => {
                expect(partCard().find(LoadingPartCard).length).toEqual(0);
            });

            it('should pass the proper props to the PartCard', () => {
                const childCard = partCard().find(PartCard).first();
                expect(childCard.props().partNum).toEqual(props.part.part_num);
                expect(childCard.props().name).toEqual(props.part.name);
            });
        });

        describe('componentDidMount', () => {
            it('should not call the provided `getSinglePart` function', () => {
                partCard();
                expect(props.getSinglePart).not.toHaveBeenCalled();
            });

            it('should dispatch an action once using the results of calling `getSinglePart`', () => {
                const actionObject = {type: 'asdf'};
                props.getSinglePart.mockReturnValue(actionObject);
                partCard();
                expect(props.dispatch).not.toHaveBeenCalled();
            });
        });
    })
});