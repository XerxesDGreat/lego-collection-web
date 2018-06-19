import React from "react";
import Enzyme, { mount } from 'enzyme';
import ConnectedUserDashboardPage, {UserDashboardPage} from './UserDashboardPage';
import UserDashboard from '../../components/users/UserDashboard';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('UserDashboardPage Container Component', () => {
    let props;
    let mountedUserDash;
    const userDash = () => {
        if (!mountedUserDash) {
             const router = mount(
                 <MemoryRouter>
                     <UserDashboardPage {...props} />
                 </MemoryRouter>
            );
            mountedUserDash = router.find(UserDashboardPage).first();
        }
        return mountedUserDash;
    };

    beforeEach(() => {
        props = {
            user: undefined,
            fetchLoggedInUser: jest.fn(),
            dispatch: jest.fn()
        };
        mountedUserDash = undefined;
    });

    it('always renders a UserDashboard', () => {
        const divs = userDash().find(UserDashboard);
        expect(divs.length).toBeGreaterThan(0);
    });

    it('contains only the UserDashboard', () => {
        const children = userDash().children();
        expect(children.length).toEqual(1);
        expect(children.is(UserDashboard)).toEqual(true);
    });

    describe('when user is undefined', () => {
        describe('the componentMount operation', () => {
            it('should call the provided `dispatch`', () => {
                userDash();
                expect(props.dispatch).toHaveBeenCalledTimes(1);
            });

            it('should call the provided `fetchLoggedInUser`', () => {
                userDash();
                expect(props.fetchLoggedInUser).toHaveBeenCalledTimes(1);
            });

            it('should call the provided `dispatch` with the results of `fetchLoggedInUser` as the lone arg', () => {
                userDash();
                const fetchLoggedInUserAction = props.fetchLoggedInUser();
                expect(props.dispatch).toHaveBeenCalledWith(fetchLoggedInUserAction);
            });
        });

        describe('the render operation', () => {
            it('should pass the undefined user to UserDashboard', () => {
                const dashComponent = userDash().find(UserDashboard);
                expect(dashComponent.props().user).not.toBeDefined();
            });
        });
    });

    describe('when user is defined', () => {
        beforeEach(() => {
            props = {
                ...props,
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

        describe('the component mount operation', () => {
            it('should not call the provided `fetchLoggedInUser`', () => {
                userDash();
                expect(props.fetchLoggedInUser).not.toHaveBeenCalled();
            });

            it('should not call the provided `dispatch`', () => {
                userDash();
                expect(props.dispatch).not.toHaveBeenCalled();
            });
        });

        describe('the render operation', () => {
            it('should pass the user to the UserDashboard', () => {
                const dashComponent = userDash().find(UserDashboard);
                expect(dashComponent.props().user).toEqual(props.user);
            })
        })
    });
});