import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Breadcrumbs from './Breadcrumbs';
import {Link, MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('Breadcrumbs Display Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            const router = mount(
                <MemoryRouter>
                    <Breadcrumbs {...props} />
                </MemoryRouter>
            );
            mountedComponent = router.find(Breadcrumbs).first();
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            menuItems: {}
        };
        mountedComponent = undefined;
    });

    describe('common render operation', () => {
        it('renders a single top-level nav', () => {
            const container = comp().children();
            expect(container.length).toEqual(1);
            expect(container.first().is('nav')).toBeTruthy();
        });

        it('renders a single ordered list', () => {
            const list = comp().find('ol');
            expect(list.length).toEqual(1);
        });
    });

    describe('When passed an empty list of menu items', () => {
        it('does not render any list items', () => {
            expect(comp().find('li').length).toEqual(0);
        });
    });

    describe('When passed a single menu item key but no value', () => {
        beforeEach(() => {
            props.menuItems['foo'] = null;
        });

        it('does not render a link', () => {
            expect(comp().find(Link).length).toEqual(0);
        });

        it('renders a single list item with the correct class', () => {
            expect(comp().find('li').length).toEqual(1);
            expect(comp().find('li.active').length).toEqual(1);
        });
    });

    describe('When passed a single menu item with a value', () => {
        const menuTitle = 'foo';
        const linkValue = 'bar';
        beforeEach(() => {
            props.menuItems[menuTitle] = linkValue;
        });

        it('renders a link with the correct target and name', () => {
            const links = comp().find(Link);
            expect(links.length).toEqual(1);
            const link = links.first();
            expect(link.props().to).toEqual(linkValue);
            expect(link.props().children).toEqual('foo');
        });

        it('renders the link inside a list item', () => {
            const items = comp().find('li');
            expect(items.length).toEqual(1);
            const listItemChildren = items.first().children();
            expect(listItemChildren.length).toEqual(1);
            expect(listItemChildren.first().is(Link)).toBeTruthy();
        });

        it('does not attach the active class to the list item', () => {
            expect(comp().find('li.active').length).toEqual(0);
        });
    });

    describe('When passed multiple menu items', () => {
        beforeEach(() => {
            props.menuItems = {
                'foo': 'bar',
                'baz': null
            }
        });

        it('renders the correct number of list items', () => {
            expect(comp().find('li').length).toEqual(2);
        });

        it('renders the correct number of Links', () => {
            expect(comp().find(Link).length).toEqual(1);
        });
    })
});