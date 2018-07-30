import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SetCard from './SetCard';

Enzyme.configure({adapter: new Adapter()});

describe('SetCard Display Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <SetCard {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        mountedComponent = undefined;
        props = {
            set: {
                set_num: "1234-1",
                name: "foo",
                image_url: "http://example.com/image.jpg",
                theme: 1,
                year: 2000,
            }
        }
    });

    describe('render operation', () => {
        it('renders a single top-level div of type "card"', () => {
            const container = comp().children();
            expect(container.length).toEqual(1);
            const firstChild = container.first();
            expect(firstChild.is('div')).toBeTruthy();
            expect(firstChild.hasClass('card')).toBeTruthy();
        });

        it('renders a single image', () => {
            const imgs = comp().find('img');
            expect(imgs.length).toEqual(1);
        });

        it('renders a "card-title" which contains the set num of the item', () => {
            const titles = comp().find('.card-title');
            expect(titles.length).toEqual(1);
            expect(titles.first().text()).toContain(props.set.set_num);
        });
    });
});