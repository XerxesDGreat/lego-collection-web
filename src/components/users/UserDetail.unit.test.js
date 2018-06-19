import React from "react";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {countOfDivsContainingString} from "../../tests/helpers";
import UserDetail from "./UserDetail";

Enzyme.configure({adapter: new Adapter()});

describe('UserDetail Display Component', () => {
    let props;
    let mountedUserDetail;
    const titleDivClass = '.user-details-title';
    const detailDivClass = '.user-details-detail';
    const userDetail = () => {
        if (!mountedUserDetail) {
            mountedUserDetail = mount(
                <UserDetail {...props} />
            );
        }
        return mountedUserDetail;
    };

    beforeEach(() => {
        props = {
            username: 'testing',
            id: 1234,
            email: 'testing@tester.com'
        };
        mountedUserDetail = undefined;
    });

    it('always renders a div', () => {
        const divs = userDetail().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    it('contains everything within a single div', () => {
        const children = userDetail().children();
        expect(children.length).toEqual(1);
        expect(children.is('div')).toEqual(true);
    });

    it('should render a title div', () => {
        const titleDivs = userDetail().find(titleDivClass);
        expect(titleDivs.length).toEqual(1);
    });

    it('should render detail divs', () => {
        const detailDivs = userDetail().find(detailDivClass);
        expect(detailDivs.length).toEqual(2);
    });

    it('should render a detail about the username', () => {
        const detailDivs = userDetail().find(detailDivClass);
        expect(countOfDivsContainingString(detailDivs, props.username)).toEqual(1);
    });

    it('should render a detail about the email', () => {
        const detailDivs = userDetail().find(detailDivClass);
        expect(countOfDivsContainingString(detailDivs, props.email)).toEqual(1);
    });
});