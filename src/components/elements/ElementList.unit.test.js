import React, {createElement} from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ElementList from './ElementList';
import ElementListItem from './ElementListItem';
import {stubPresentationComponent} from "../../tests/helpers";

stubPresentationComponent(ElementListItem);

Enzyme.configure({adapter: new Adapter()});

describe('ElementList Presentation Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <ElementList {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            elements: [],
            loading: false
        };
        mountedComponent = undefined;
    });

    describe('when loading is set to true', () => {
        beforeEach(() => {
            props.loading = true
        });

        it('renders a single div', () => {
            expect(comp().find('div').length).toEqual(1);
        });

        it('does not render a list container', () => {
            expect(comp().find('ul').length).toEqual(0);
        })
    });

    describe('when loading is set to false', () => {
        beforeEach(() => {
            props.loading = false;
        });

        it('renders a list container', () => {
            expect(comp().find('ul').length).toEqual(1);
        });

        it('does not render a div as the top-level item', () => {
            expect(comp().children().first().is('div')).toBeFalsy();
        });

        describe('when element list is empty', () => {
            it('renders no list elements', () => {
                expect(comp().find('li').length).toEqual(0);
            });
        });

        describe('when the element list is not empty', () => {
            const element0 = {
                id: 123,
                part: '2304',
                color: 15,
                image_url: 'http://www.example.com/element0.jpg'
            };
            beforeEach(() => {
                props.elements = [element0]
            });

            it('renders a single list element', () => {
                expect(comp().find(ElementListItem).length).toEqual(1);
            });


            it('passes the proper elements to each entry in the list', () => {
                const listContainer = comp().find('ul').first();
                const listItem = listContainer.children().first();
                expect(listItem.props().id).toEqual(element0.id);
                expect(listItem.props().partNum).toEqual(element0.part);
                expect(listItem.props().colorId).toEqual(element0.color);
                expect(listItem.props().imageUrl).toEqual(element0.image_url);
            })
        });

        describe('when more than one elements are in the list', () => {
            const element0 = {
                id: 123,
                part: '2306',
                color: 15,
                image_url: 'http://www.example.com/element0.jpg'
            };
            const element1 = {
                id: 456,
                part: '2306',
                color: 12,
                image_url: 'http://www.example.com/element1.jpg'
            };
            beforeEach(() => {
                props.elements = [element0, element1]
            });

            it('renders the correct number of items', () => {
                expect(comp().find(ElementListItem).length).toEqual(props.elements.length);
            });
        });
    });
});