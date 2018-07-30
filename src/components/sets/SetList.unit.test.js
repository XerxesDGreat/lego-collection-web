import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SetList from './SetList';
import SetCardContainer from '../../containers/sets/SetCardContainer';

Enzyme.configure({adapter: new Adapter()});

describe('SetList Display Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <SetList {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        mountedComponent = undefined;
        props = {
            sets: []
        }
    });

    describe('With Empty list of sets', () => {
        it('renders a single top-level div', () => {
            const container = comp().children();
            expect(container.length).toEqual(1);
        });

        it('renders 0 SetCardContainers', () => {
            expect(comp().find(SetCardContainer).length).toEqual(0);
        });
    });

    describe('With a non-empty list of sets', () => {
        beforeEach(() => {
            props.sets = [
                {name: 'foo', set_num: '100'},
                {name: 'bar', set_num: '200'}
            ];
        });

        it('renders the same number of SetCardContainers as we have sets', () => {
            expect(comp().find(SetCardContainer).length).toEqual(props.sets.length);
        })
    });
});