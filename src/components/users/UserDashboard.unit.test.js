import React from "react";
import Enzyme, { mount } from 'enzyme';
import UserDashboard from './UserDashboard';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe("User Dashboard Display Component", () => {
    let props;
    let mountedUserDash;
    const userDash = () => {
        if (!mountedUserDash) {
            const router = mount(
                <MemoryRouter>
                    <UserDashboard {...props} />
                </MemoryRouter>
            );
            mountedUserDash = router.find(UserDashboard).first();
        }
        return mountedUserDash;
    };

    beforeEach(() => {
        props = {
            user: undefined
        };
        mountedUserDash = undefined;
    });

    it('always renders a div', () => {
        const divs = userDash().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    it('contains everything within a single div', () => {
        const children = userDash().children();
        expect(children.length).toEqual(1);
        expect(children.is('div')).toEqual(true);
    });

    describe('when user is undefined', () => {
        beforeEach(() => {
            props = {
                user: undefined
            }
        });

        it('displays a loading screen', () => {
            const divContents = userDash().first().children();
            expect(divContents.props().children).toEqual('loading');
        });

        it('should not display UserDetail', () => {
            const userDetail = userDash().find('UserDetail');
            expect(userDetail.length).toEqual(0);
        });

        it('should not display UserPartSummary', () => {
            const userPartSummary = userDash().find('UserPartSummary');
            expect(userPartSummary.length).toEqual(0);
        })
    });

    describe('when user is defined', () => {
        beforeEach(() => {
            props = {
                user: {
                    username: 'username',
                    id: 123,
                    email: 'username@example.com',
                    parts: {
                        storage: 3,
                        display: 4
                    }
                }
            }
        });

        it('should display UserDetail and pass the appropriate props', () => {
            const userDetail = userDash().find('UserDetail');
            expect(userDetail.length).toEqual(1);
            expect(userDetail.props().username).toEqual(props.user.username);
            expect(userDetail.props().id).toEqual(props.user.id);
            expect(userDetail.props().email).toEqual(props.user.email);
        });

        it('should display UserPartSummary and pass the appropriate props', () => {
            const userPartSummary = userDash().find('UserPartSummary');
            expect(userPartSummary.length).toEqual(1);
            expect(userPartSummary.props().storage).toEqual(props.user.parts.storage);
            expect(userPartSummary.props().display).toEqual(props.user.parts.display);
        });
    });
});