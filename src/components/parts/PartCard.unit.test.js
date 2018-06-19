import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PartCard, * as partCardFuncs from './PartCard';
import {MemoryRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('PartCard Display Component', () => {
    let props;
    let mountedPartCard;
    const partCard = () => {
        if (!mountedPartCard) {
            const router = mount(
                <MemoryRouter>
                    <PartCard {...props} />
                </MemoryRouter>
            );
            mountedPartCard = router.find(PartCard).first();
        }
        return mountedPartCard;
    };

    beforeEach(() => {
        // includes required props
        props = {
            partNum: '1545',
            name: '2 x 2 brick',
            thumbnailUrl: undefined
        };
        mountedPartCard = undefined;
    });

    describe('render', () => {
        it('always renders a single top-level div', () => {
            const partCardChildren = partCard().children();
            expect(partCardChildren.length).toEqual(1);
            expect(partCardChildren.first().is('div')).toBeTruthy();
        });

        it('always renders a single image', () => {
            const images = partCard().find('img');
            expect(images.length).toEqual(1);
        });

        const getLinksWithTarget = (links, target) => {
            const linksWithTarget = [];
            links.forEach((link) => {
                if (link.props().to === target) {
                    linksWithTarget.push(link);
                }
            });
            return linksWithTarget;
        };

        it('always renders at least one link to the detail page', () => {
            const linkUrl = partCardFuncs.getPartDetailLinkUrl(props);
            const links = partCard().find('Link');
            expect(getLinksWithTarget(links, linkUrl).length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('getImageUrlForPart', () => {
        describe('when thumbnail is undefined', () => {
            it('will not return an undefined image url', () => {
                expect(partCardFuncs.getImageUrlForPart(props)).toBeDefined();
            });
        });

        describe('when thumbnail is defined', () => {
            beforeEach(() => {
                props.thumbnailUrl = 'https://example.com/something.jpg'
            });

            it('will return the provided thumbnail url', () => {
                expect(partCardFuncs.getImageUrlForPart(props)).toEqual(props.thumbnailUrl);
            });
        })
    });
});