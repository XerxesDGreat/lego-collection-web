import React from 'react';
import PropTypes from 'prop-types';

const getPreviousOrNextClassName = shouldShow => {
    const baseClassName = "page-item";
    return shouldShow ? baseClassName : baseClassName + " disabled";
};

const getNumberedListItem = (linkPageNum, currentPageNum, onPageClick) => {
    return linkPageNum === currentPageNum || linkPageNum === '...' ? (
        <li key={"page" + linkPageNum} className="page-item active">
            <span className="page-link">
                {linkPageNum}
            </span>
        </li>
    ) : (
        <li key={"page" + linkPageNum} className="page-item">
            <button className="page-link"
                    onClick={() => onPageClick(linkPageNum)}
            >
                {linkPageNum}
            </button>
        </li>
    );
};

// returns a list of ONE-INDEXED pages since that's what we'll be displaying
const getArrayOfPages = (numPages, maxLinkCount, currentPageNum) => {
    if (numPages <= maxLinkCount) {
        return [...Array(numPages).keys()].map(page => page + 1);
    }

    const onEitherSide = Math.floor(maxLinkCount / 2);
    let startingPoint, endingPoint;
    if (currentPageNum - onEitherSide <= 1) {
        // we're at the bottom end
        startingPoint = 1;
        endingPoint = startingPoint + (maxLinkCount - 1);
    } else if (currentPageNum + onEitherSide >= numPages) {
        // we're at the top end
        endingPoint = numPages;
        startingPoint = endingPoint - (maxLinkCount - 1);
    } else {
        // we're somewhere in the middle
        startingPoint = currentPageNum - onEitherSide;
        endingPoint = currentPageNum + onEitherSide;
    }

    const pageList = [];
    for (let i = startingPoint; i <= endingPoint; i ++) {
        pageList.push(i);
    }

    return pageList;
};

const getNumberedListItems = (totalCount, itemsPerPage, currentPageNum, onPageClick, maxLinkCount) => {
    const numPages = getNumPages(totalCount, itemsPerPage);
    return getArrayOfPages(numPages, maxLinkCount, currentPageNum)
        .map(itemNum => getNumberedListItem(itemNum, currentPageNum, onPageClick));
};

const getNumPages = (totalCount, itemsPerPage) => {
    const remainder = totalCount % itemsPerPage;
    const a = Math.floor(totalCount / itemsPerPage) + (remainder === 0 ? 0 : 1);
    return a;
};

const Pagination = props => {
    const {
        hasPrevious,
        onPreviousClick,
        totalCount,
        onPageClick,
        hasNext,
        onNextClick,
        currentPageNum,
    } = props;

    const itemsPerPage = 'itemsPerPage' in props ? props.itemsPerPage : 100;
    const maxLinkCount = 'maxLinkCount' in props ? props.maxLinkCount : 7; // this number must be odd

    if (maxLinkCount % 2 === 0) {
        throw new Error('maxLinkCount must be odd');
    }

    const thisPageStartsAt = itemsPerPage * (currentPageNum - 1) + 1;
    const thisPageEndsAt = itemsPerPage * currentPageNum;

    return (
        <div>
            <nav aria-label="pagination">
                <ul className="pagination justify-content-center">
                    <li className={getPreviousOrNextClassName(hasPrevious)}>
                        <button className="page-link"
                                onClick={onPreviousClick}>
                            Previous
                        </button>
                    </li>
                    {getNumberedListItems(totalCount, itemsPerPage, currentPageNum, onPageClick, maxLinkCount)}
                    <li className={getPreviousOrNextClassName(hasNext)}>
                        <button className="page-link"
                                onClick={onNextClick}>
                            Next
                        </button>
                    </li>
                </ul>
                <span>(showing items {thisPageStartsAt} through {Math.min(thisPageEndsAt, totalCount)} of {totalCount})</span>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    hasPrevious: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number,
    currentPageNum: PropTypes.number.isRequired,
    maxLinkCount: PropTypes.number, // this number should be odd
};

export default Pagination;