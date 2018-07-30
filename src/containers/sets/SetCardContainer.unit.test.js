import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SetCardContainer} from './SetCardContainer';
import LoadingSetCard from '../../components/sets/LoadingSetCard';
import SetCard from '../../components/sets/SetCard';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('SetCardContainer Container Component', () => {
    let props;
    let mountedComp;
    const comp = () => {
        if (!mountedComp) {
            mountedComp = shallow(
                <SetCardContainer {...props} />
            );
        }
        return mountedComp;
    };

    beforeEach(() => {
        // includes required props
        props = {
            setNum: '1545',
            set: undefined,
            dispatch: jest.fn(),
            getSingleSet: jest.fn()
        };
        mountedComp = undefined;
    });

    describe('when set is undefined', () => {
        describe('render', () => {
            it('should render a LoadingSetCard', () => {
                expect(comp().find(LoadingSetCard).length).toEqual(1);
            });

            it('should not render a setCard', () => {
                expect(comp().find(SetCard).length).toEqual(0);
            });
        });

        describe('componentDidMount', () => {
            it('should call the provided `getSingleSet` function', () => {
                comp();
                expect(props.getSingleSet).toHaveBeenCalledTimes(1);
            });

            it('should dispatch an action once using the results of calling `getSingleSet`', () => {
                const actionObject = {type: 'asdf'};
                props.getSingleSet.mockReturnValue(actionObject);
                comp();
                expect(props.dispatch).toHaveBeenCalledTimes(1);
                expect(props.dispatch).toHaveBeenCalledWith(actionObject);
            });
        });
    });

    describe('when set is defined', () => {
        beforeEach(() => {
            props.set = {
                set_num: '1545',
                name: 'Foo',
                year: 1989,
                theme: 1,
                image_url: 'http://example.com/image.jpg'
            }
        });

        describe('render', () => {
            it('should render a SetCard', () => {
                //expect(comp().containsMatchingElement(SetCard)).toEqual(true);
                const c = comp();
                //expect(comp().find("SetCard").length).toEqual(1);
            });

            it('should not render a LoadingSetCard', () => {
                expect(comp().find(LoadingSetCard).length).toEqual(0);
            });

            it('should pass the proper props to the comp()', () => {
                const childCard = comp().find(SetCard).first();
                expect(childCard.props().set).toEqual(props.set);
            });
        });

        describe('componentDidMount', () => {
            it('should not call the provided `getSingleSet` function', () => {
                comp();
                expect(props.getSingleSet).not.toHaveBeenCalled();
            });

            it('should dispatch an action once using the results of calling `getSingleSet`', () => {
                const actionObject = {type: 'asdf'};
                props.getSingleSet.mockReturnValue(actionObject);
                comp();
                expect(props.dispatch).not.toHaveBeenCalled();
            });
        });
    })
});