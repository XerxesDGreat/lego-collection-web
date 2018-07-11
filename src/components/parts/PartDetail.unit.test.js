import React, {createElement} from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PartDetail from './PartDetail';

Enzyme.configure({adapter: new Adapter()});

describe('PartDetail Presentation Component', () => {
    let props;
    let mountedComponent;
    let children;
    const comp = () => {
        if (!mountedComponent) {
            if (children !== undefined) {
                mountedComponent = shallow(
                    <PartDetail {...props}>
                        {children}
                    </PartDetail>
                )
            } else {
                mountedComponent = shallow(
                    <PartDetail {...props} />
                );
            }
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            part: undefined
        };
        mountedComponent = undefined;
        children = undefined;
    });

    describe('when part is undefined', () => {
        describe('when child components are not passed', () => {
            it('renders nothing', () => {
                expect(comp().children().length).toEqual(0);
            });
        });

        describe('when child components are passed', () => {
            beforeEach(() => {
                children = createElement('div');
            });
            it('renders nothing', () => {
                expect(comp().children().length).toEqual(0);
            });
        });
    });

    describe('when part is defined', () => {
        beforeEach(() => {
            props = {
                part: {
                    part_num: '1234',
                    name: 'foo',
                    category: 3,
                    thumbnail_url: 'http://www.example.com/lego.jpg'
                }
            };
        });

        describe('when child components are not passed', () => {
            it('renders an image for the provided part', () => {
                const {part_num, thumbnail_url} = props.part;
                const imgs = comp().find('img');
                expect(imgs.length).toEqual(1);
                expect(imgs.first().props().src).toEqual(thumbnail_url);
                expect(imgs.first().props().alt).toEqual(expect.stringContaining(part_num));
            });

            // it('renders a body for the provided part', () => {
            //     const {part_num, name} = props.part;
            //     const headings = comp().find(Media.Heading);
            //     expect(headings.length).toEqual(1);
            //     const heading = headings.first();
            //     expect(heading.props().children).toEqual(expect.stringContaining(part_num));
            //     expect(heading.props().children).toEqual(expect.stringContaining(name));
            // });
            //
            // it('does not render more than the Media.Heading in the Media.Body', () => {
            //     const body = comp().find(Media.Body).first();
            //     expect(body.children().length).toEqual(1);
            //     expect(body.children().first().is(Media.Heading)).toBeTruthy();
            // });
        });

        describe('when child components are passed' , () => {
            beforeEach(() => {
                children = createElement('div');
            });

            // it('renders the provided child components as children of Media.Body', () => {
            //     const body = comp().find(Media.Body).first();
            //     expect(body.children().length).toEqual(2);
            //     expect(body.children().first().is(Media.Heading)).toBeTruthy();
            //     expect(body.children().last().is('div')).toBeTruthy();
            // });
        });
    });
});