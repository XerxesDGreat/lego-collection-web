import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadingSetCard, {loadingImg} from './LoadingSetCard';

Enzyme.configure({adapter: new Adapter()});

describe('LoadingSetCard Display Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <LoadingSetCard {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        mountedComponent = undefined;
    });

    describe('render operation', () => {
        it('renders a single top-level div', () => {
            const container = comp().children();
            expect(container.length).toEqual(1);
            expect(container.first().is('div')).toBeTruthy();
        });

        it('renders a single image', () => {
            const imgs = comp().find('img');
            expect(imgs.length).toEqual(1);
        });

        it('renders the image with the given loading image', () => {
            const img = comp().find('img').first();
            expect(img.props().src).toEqual(loadingImg);
        });
    });
});