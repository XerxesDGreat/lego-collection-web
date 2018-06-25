import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PartDetailPage} from './PartDetailPage';
import * as currentPart from '../../modules/currentPart';
import PartDetail from '../../components/parts/PartDetail';
import ElementListContainer from '../elements/ElementListContainer';

Enzyme.configure({adapter: new Adapter()});

describe('PartDetailPage Container Component', () => {
    let props;
    let mountedComponent;
    let mockFetchPartById;
    const partNum = '1234';
    const comp = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <PartDetailPage {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        // includes required props
        props = {
            match: {
                params: {
                    id: partNum
                }
            },
            part: undefined,
            dispatch: jest.fn(),
            isFetching: false
        };
        mountedComponent = undefined;
        mockFetchPartById = jest.mock('../../modules/currentPart', () => ({fetchPartById: jest.fn()}));
    });

    describe('render operations', () => {
        it('always renders a PartDetail, passing the right props', () => {
            const partDetailComps = comp().find(PartDetail);
            expect(partDetailComps.length).toEqual(1);
            const partDetail = partDetailComps.first();
            expect(partDetail.props().part).toEqual(props.part);
        });

        it('always renders an ElementListContainer, passing the right props', () => {
            const elementListContainers = comp().find(ElementListContainer);
            expect(elementListContainers.length).toEqual(1);
            const elementListContainer = elementListContainers.first();
            expect(elementListContainer.props().partNum).toEqual(partNum);
        });

        it('the ElementListContainer is the only child of PartDetail', () => {
            const partDetail = comp().find(PartDetail).first();
            expect(partDetail.children().length).toEqual(1);
            expect(partDetail.children().first().is(ElementListContainer)).toBeTruthy();
        });
    });

    describe('on mount', () => {
        const mockFetchPartById = jest.fn();
        const fakeAction = {foo: 'bar'};
        mockFetchPartById.mockReturnValue(fakeAction);
        beforeEach(() => {
            currentPart.fetchPartById = mockFetchPartById;
        });

        afterEach(() => {
            //mockFetchPartById.reset();
        });

        it('always calls fetchPartById', () => {
            comp();
            expect(mockFetchPartById).toHaveBeenCalledWith(partNum);
        });

        it('always calls dispatch, passing along the response of fetchPartById', () => {
            comp();
            expect(props.dispatch).toHaveBeenCalledWith(fakeAction);
        })
    });
});