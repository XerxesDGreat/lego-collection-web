import React, {createElement} from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ElementListItem from './ElementListItem';

Enzyme.configure({adapter: new Adapter()});

describe('ElementListItem Presentation Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <ElementListItem {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            id: 123,
            partNum: '234',
            colorId: 15,
            imageUrl: 'http://www.example.com/part1'
        };
    });

    it('renders a list item', () => {
        expect(comp().find('li').length).toEqual(1);
    });

    it('renders an image using the provided imageUrl as the src', () => {
        const images = comp().find('img');
        expect(images.length).toEqual(1);
        expect(images.first().props().src).toEqual(props.imageUrl);
    });
});