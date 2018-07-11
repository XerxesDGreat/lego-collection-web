import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ElementListContainer, mapStateToProps} from './ElementListContainer';
import ElementList from '../../components/elements/ElementList';
import {stubPresentationComponent} from "../../tests/helpers";

jest.unmock('../../modules/elements.js');
const elements = require('../../modules/elements');
elements.fetchElementsForPart = jest.fn();
elements.isLoadingPart = jest.fn();
elements.getElementsForPart = jest.fn();
//import {fetchElementsForPart, getElementsForPart} from "../../modules/elements";

stubPresentationComponent(ElementList);

Enzyme.configure({adapter: new Adapter()});

describe('PartCardPage Container Component', () => {
    let props;
    let mountedComponent;
    let elementsMock;
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                    <ElementListContainer {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        elementsMock = jest.mock('../../modules/elements');
        props = {
            dispatch: jest.fn(),
            partNum: '1545',
            loading: false,
            elements: []
        };
        mountedComponent = undefined;
    });

    afterEach(() => {
        elementsMock = undefined;
        jest.clearAllMocks();
    });

    it('always renders an ElementList with the expected props', () => {
        expect(comp().find(ElementList).length).toEqual(1);
        const elementList = comp().find(ElementList).first();
        expect(elementList.props().elements).toBe(props.elements);
        expect(elementList.props().loading).toBe(props.loading);
    });

    describe('when loading is set to true', () => {
        beforeEach(() => {
            props.loading = true
        });

        it('does not call dispatch', () => {
            comp();
            expect(props.dispatch).not.toHaveBeenCalled();
        });
    });

    describe('when loading is set to false', () => {
        it('calls the fetch operation on load with the correct properties', () => {
            comp();
            expect(elements.fetchElementsForPart).toHaveBeenCalledTimes(1);
            expect(elements.fetchElementsForPart).toHaveBeenCalledWith(props.partNum);
        });

        it('calls dispatch upon load with the correct values', () => {
            const response = {foo: 'bar', partNum: props.partNum};
            const mockResponse = (partNum) => ({foo: 'bar', partNum: partNum});
            elements.fetchElementsForPart.mockImplementation((partNum) => mockResponse(partNum));
            comp();
            expect(props.dispatch).toHaveBeenCalledTimes(1);
            expect(props.dispatch).toHaveBeenCalledWith(response);
        });
    });
});

describe('mapStateToProps', () => {
    beforeEach(() => {
        elements.isLoadingPart.mockReturnValue(false);
        elements.getElementsForPart.mockReturnValue([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns the correct data structure', () => {
        const actual = mapStateToProps({}, {});
        expect(actual).toEqual({loading: false, elements: []});
    });

    it('always calls getElementsForPart with the right state and part num', () => {
        const state = {foo: 'bar'};
        const partNum = '2045';
        const ownProps = {partNum: partNum};
        mapStateToProps(state, ownProps);
        expect(elements.getElementsForPart).toHaveBeenCalledTimes(1);
        expect(elements.getElementsForPart).toHaveBeenCalledWith(state, partNum);
    });


    it('always calls isLoadingPart with the right state and part num', () => {
        const state = {foo: 'bar'};
        const partNum = '2045';
        const ownProps = {partNum: partNum};
        mapStateToProps(state, ownProps);
        expect(elements.isLoadingPart).toHaveBeenCalledTimes(1);
        expect(elements.isLoadingPart).toHaveBeenCalledWith(state, partNum);
    })
});