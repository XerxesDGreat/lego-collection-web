import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';
import {Link, MemoryRouter} from 'react-router-dom';
import {routes} from "../../config";

Enzyme.configure({adapter: new Adapter()});

describe('Header Display Component', () => {
    let props;
    let mountedComponent;
    const comp = () => {
        if (!mountedComponent) {
            const router = mount(
                <MemoryRouter>
                    <Header {...props} />
                </MemoryRouter>
            );
            mountedComponent = router.find(Header).first();
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            loggedInUser: undefined
        };
        mountedComponent = undefined;
    });

    describe('common render operation', () => {
        it('renders a single top-level div', () => {
            const container = comp().children();
            expect(container.length).toEqual(1);
            expect(container.first().is('div')).toBeTruthy();
        });

        it('renders an image', () => {
            const list = comp().find('img');
            expect(list.length).toEqual(1);
        });

        it('renders a nav container', () => {
            expect(comp().find('nav').length).toEqual(1);
        });

        it('renders a number of links', () => {
            expect(comp().find(Link).length).toBeGreaterThan(0);
        })
    });

    describe('When passed an undefined user', () => {
        it('renders a link to the login page', () => {
            const potentialLinks = comp().find({to: routes.login});
            expect(potentialLinks.length).toEqual(1);
            const link = potentialLinks.first();
            expect(link.props().children).toEqual('Login');
        });

        it('does not render a link to the user dashboard', () => {
            expect(comp().find({to: routes.myDashboard}).length).toEqual(0);
        });
    });

    describe('When passed a defined user', () => {
        const username = 'myusername';
        beforeEach(() => {
            props.loggedInUser = {
                username: username
            };
        });

        it('does not render a link to login', () => {
            expect(comp().find({to: routes.login}).length).toEqual(0);
        });

        it('renders a link to the user dashboard', () => {
            const potentialLinks = comp().find({to: routes.myDashboard});
            expect(potentialLinks.length).toEqual(1);
            const link = potentialLinks.first();
            expect(link.text()).toEqual(expect.stringContaining(username));
        });
    });
});