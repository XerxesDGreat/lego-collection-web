import React from "react";
import Enzyme, { mount } from 'enzyme';
import UserPartSummary from './UserPartSummary';
import Adapter from 'enzyme-adapter-react-16';
import {countOfDivsContainingString} from '../../tests/helpers';
import {Link, MemoryRouter} from 'react-router-dom';
import {routes} from '../../config';

Enzyme.configure({adapter: new Adapter()});

describe('UserPartSummary Display Component', () => {
    let props;
    let mountedUserPartSummary;
    const titleDivClass = '.part-info-title';
    const detailDivClass = '.part-info-detail';
    const userSummary = () => {
        if (!mountedUserPartSummary) {
            const router =  mount(
                <MemoryRouter>
                    <UserPartSummary {...props} />
                </MemoryRouter>
            );
            mountedUserPartSummary = router.find(UserPartSummary).first();
        }
        return mountedUserPartSummary;
    };

    beforeEach(() => {
        props = {
            storage: 3,
            display: 4
        };
        mountedUserPartSummary = undefined;
    });

    it('always renders a div', () => {
        const divs = userSummary().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    it('contains everything within a single div', () => {
        const children = userSummary().children();
        expect(children.length).toEqual(1);
        expect(children.is('div')).toEqual(true);
    });

    it('should render a title div', () => {
        const titleDivs = userSummary().find(titleDivClass);
        expect(titleDivs.length).toEqual(1);
    });

    it('should render detail divs', () => {
        const detailDivs = userSummary().find(detailDivClass);
        expect(detailDivs.length).toEqual(2);
    });

    it('should render a detail about the total parts', () => {
        const detailDivs = userSummary().find(detailDivClass);
        const total = props.storage + props.display;
        expect(countOfDivsContainingString(detailDivs, total)).toEqual(1);
    });

    it('should render a detail about the parts in storage', () => {
        const detailDivs = userSummary().find(detailDivClass);
        expect(countOfDivsContainingString(detailDivs, props.storage)).toEqual(1);
    });

    it('should render a detail about the parts on display', () => {
        const detailDivs = userSummary().find(detailDivClass);
        expect(countOfDivsContainingString(detailDivs, props.display)).toEqual(1);
    });

    it('should render a link to all of the user\'s parts', () => {
        const links = userSummary().find(Link);
        expect(links.length).toEqual(1);
        const link = links.first();
        expect(link.props().to).toEqual(routes.myPartList);
    });
});