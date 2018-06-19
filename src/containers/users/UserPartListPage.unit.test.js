import React from "react";
import Enzyme, { mount } from 'enzyme';
import {UserPartListPage, mapStateToProps} from './UserPartListPage';
import UserPartList from '../../components/users/UserPartList';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('UserPartListPage Container Component', () => {
    let props;
    let mountedPartsPage;
    const partsPage = () => {
        if (!mountedPartsPage) {
            mountedPartsPage = mount(
                <UserPartListPage {...props} />
            );
        }
        return mountedPartsPage;
    };

    beforeEach(() => {
        props = {
            elements: [],
            fetchPage: jest.fn(),
            dispatch: jest.fn()
        };
        mountedPartsPage = undefined;
    });

    describe('mount operations', () => {
        it('should call `dispatch`', () => {
            partsPage();
            expect(props.dispatch).toHaveBeenCalledTimes(1);
        });

        it('should call `fetchPage`', () => {
            partsPage();
            expect(props.fetchPage).toHaveBeenCalledTimes(1);
        });

        it('should call `dispatch` with the results of calling `fetchPage`', () => {
            partsPage();
            const fetchPageResults = props.fetchPage();
            expect(props.dispatch).toHaveBeenCalledWith(fetchPageResults);
        })
    });

    describe('render', () => {
        it('always mounts UserPartList', () => {
            const partList = partsPage().find(UserPartList);
            expect(partList.length).toBeGreaterThan(0);
        });

        it('contains only the UserPartList', () => {
            const children = partsPage().children();
            expect(children.length).toEqual(1);
            expect(children.is(UserPartList)).toEqual(true);
        });

        it('passes the provided elements to the UserPartList', () => {
            const partList = partsPage().find(UserPartList).first();
            expect(partList.props().elements).toEqual(props.elements);
        })

    });

    describe('mapStateToProps', () => {
        it('should return the proper values', () => {
            const userPartState = {entities: {}, pagination: {}};
            const state = {userParts: userPartState};
            const props = mapStateToProps(state);
            expect(props.elements).toEqual([]);
            // for some reason, when I do
            // expect(props.fetchPage).toBe(expect.any(Function));
            // I get the following:
            // - Expected
            // + Received
            //
            // -Any<Function>
            // +[Function anonymous]
            // and a failure. This doesn't make much sense to me, but Google has not been any help. Thus, I'm
            // just going to test that the typeof the result is a function; that should be good enough, right?
            expect(typeof(props.fetchPage)).toEqual('function');

        });
    });
});