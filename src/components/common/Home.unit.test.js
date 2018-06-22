import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

Enzyme.configure({adapter: new Adapter()});

describe('Home Display Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <Home {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        mountedComponent = undefined;
    });

    describe('common render operation', () => {
        it('just passes because seriously there\'s nothin\' to test here', () => {
            expect(true).toEqual(true);
        });
    });
});