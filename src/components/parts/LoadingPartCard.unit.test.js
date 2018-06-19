import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadingPartCard, {loadingImg} from './LoadingPartCard';

Enzyme.configure({adapter: new Adapter()});

describe('PartCardPage Container Component', () => {
    let props;
    let mountedPartCard;
    const partCard = () => {
        if (!mountedPartCard) {
            mountedPartCard = mount(
                <LoadingPartCard {...props} />
            );
        }
        return mountedPartCard;
    };

    beforeEach(() => {
        mountedPartCard = undefined;
    });

    describe('render operation', () => {
        it('renders a single top-level div', () => {
            const container = partCard().children();
            expect(container.length).toEqual(1);
            expect(container.first().is('div')).toBeTruthy();
        });

        it('renders a single image', () => {
            const imgs = partCard().find('img');
            expect(imgs.length).toEqual(1);
        });

        it('renders the image with the given loading image', () => {
            const img = partCard().find('img').first();
            expect(img.props().src).toEqual(loadingImg);
        });
    });
});