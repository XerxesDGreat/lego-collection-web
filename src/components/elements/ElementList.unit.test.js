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

        describe('when elements are in the list', () => {
            const element0 = {id: 1234};
            const element1 = {id: 2345};
            beforeEach(() => {
                props.elements = [element0, element1]
            });

            it('renders the correct number of items', () => {
                expect(comp().find(ElementListItem).length).toEqual(props.elements.length);
            });

            it('passes the proper elements to each entry in the list', () => {
                const listContainer = comp().find('ul').first();
                expect(listContainer.children().at(0).props().element).toEqual(element0);
                expect(listContainer.children().at(1).props().element).toEqual(element1);
            })
        });
    });
});