import React from 'react';
import {connect} from 'react-redux';
import {fetchPartCategoriesIfNeeded} from '../../actions/partCategoryActions';
import PropTypes from 'prop-types';
import ModelList from '../../components/models/ModelList';
import SetList from "../../components/sets/SetList";
const MODAL_NAME = 'setDetail';

export class SetListPage extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     selectedSet: undefined,
        //     // categoryId: this.props.categoryId
        // };

        // this.onPartCardClick = this.onPartCardClick.bind(this);
        // this.onCloseModal = this.onCloseModal.bind(this);
        // this.onFilterCategoryChange = this.onFilterCategoryChange.bind(this);
        // this.onPreviousClick = this.onPreviousClick.bind(this);
        // this.onNextClick = this.onNextClick.bind(this);
        // this.onNagivateToPage = this.onNagivateToPage.bind(this);
    }

    componentDidMount() {
        const {dispatch, fetchSets} = this.props;
        //dispatch(fetchPartCategoriesIfNeeded());
        dispatch(fetchSets(1/*, {category_id: categoryId}*/));
    }

    componentDidUpdate() {
        console.log("SetListPage component updated");
    };

    // onPartCardClick(part) {
    //     this.setState({selectedPart: part});
    // }

    // onCloseModal() {
    //     this.setState({selectedPart: undefined});
    // }

    // onNextClick() {
    //     console.log("next click");
    //     const {dispatch, hasNext, fetchNextPage} = this.props;
    //     if (hasNext) {
    //         dispatch(fetchNextPage());
    //     }
    // }
    //
    // onPreviousClick() {
    //     console.log("previous click");
    //     const {dispatch, hasPrevious, fetchPreviousPage} = this.props;
    //     if (hasPrevious) {
    //         dispatch(fetchPreviousPage())
    //     }
    // }

    // onNagivateToPage(page) {
    //     console.log("go to page " + page);
    //     const {dispatch, fetchParts} = this.props;
    //     dispatch(fetchParts(page));
    // };

    // getPaginationComponent() {
    //     const {hasPrevious, hasNext, totalCount, currentPageNum} = this.props;
    //     return (
    //         <Pagination hasPrevious={hasPrevious}
    //                     hasNext={hasNext}
    //                     onPreviousClick={this.onPreviousClick}
    //                     onNextClick={this.onNextClick}
    //                     totalCount={totalCount}
    //                     currentPageNum={currentPageNum}
    //                     onPageClick={this.onNagivateToPage}
    //         />
    //     );
    // }

    /*
    onFilterCategoryChange(evt) {
        const {dispatch, fetchParts, filters} = this.props;
        const categoryId = evt.target.value;
        const newFilters = {...filters};
        newFilters.category_id = categoryId !== null && categoryId > 0 ? categoryId : undefined;
        this.setState({
            categoryId
        });
        dispatch(fetchParts(1, newFilters));
    }
    */

    render() {
        // const {categoryId, selectedPart} = this.state;
        // const {partCategories, parts} = this.props;
        const {sets} = this.props;
        return (
            <div>
                {/*<PartFilterForm optionValueList={partCategories}*/}
                                {/*selectedCategory={categoryId}*/}
                                {/*onChangeCategory={this.onFilterCategoryChange} />*/}
                <SetList sets={sets} />
                          {/*onPartCardClick={this.onPartCardClick}*/}
                          {/*modalName={MODAL_NAME}*/}
                          {/*paginationComponent={this.getPaginationComponent()}*/}
                />
                {/*<PartModalContainer part={selectedPart}*/}
                                    {/*modalName={MODAL_NAME}*/}
                                    {/*onClose={() => this.onCloseModal()}/>*/}
            </div>
        );
    }
}

SetListPage.propTypes = {
    paginator: PropTypes.object.isRequired,
    stateSelector: PropTypes.func.isRequired,
    // partCategories: PropTypes.array.isRequired,
    sets: PropTypes.array.isRequired,
    fetchSets: PropTypes.func.isRequired,
    // filters: PropTypes.object.isRequired,
    // loggedInUser: PropTypes.shape({
    //     email: PropTypes.string.isRequired,
    //     id: PropTypes.number.isRequired,
    //     username: PropTypes.string.isRequired
    // }),
};

export const mapStateToProps = (state, ownProps) => {
    const {paginator, stateSelector} = ownProps;
    const thisState = stateSelector(state);
    return {
        //partCategories: state.partCategories.items,
        sets: paginator.selectors.getCurrentPageItems(thisState),
        fetchSets: paginator.navigation.fetchPage(thisState),
        // filters: paginator.selectors.getFilters(thisState),
        // hasNext: paginator.selectors.hasNext(thisState),
        // hasPrevious: paginator.selectors.hasPrevious(thisState),
        // totalCount: paginator.selectors.getTotalCount(thisState),
        // currentPageNum: paginator.selectors.getCurrentPageNum(thisState),
        // fetchNextPage: paginator.navigation.fetchNextPage(thisState),
        // fetchPreviousPage: paginator.navigation.fetchPreviousPage(thisState),
    };
};

export default connect(mapStateToProps)(SetListPage);