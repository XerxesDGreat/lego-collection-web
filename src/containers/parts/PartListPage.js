import React from 'react';
import {connect} from 'react-redux';
import {fetchPartCategoriesIfNeeded} from '../../actions/partCategoryActions';
import PropTypes from 'prop-types';
import PartList from '../../components/parts/PartList';
import PartFilterForm from '../../components/parts/PartFilterForm';

export class PartListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPart: undefined,
            categoryId: this.props.categoryId
        };

        this.onPartCardClick = this.onPartCardClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onFilterCategoryChange = this.onFilterCategoryChange.bind(this);
    }

    componentDidMount() {
        const {dispatch, categoryId, fetchParts} = this.props;
        dispatch(fetchPartCategoriesIfNeeded());
        dispatch(fetchParts(1, {category_id: categoryId}));
    }

    componentDidUpdate() {
        console.log("PartListPage component updated");
    };

    onPartCardClick(part) {
        //this.setState({selectedPart: part});
    }

    onCloseModal() {
        this.setState({selectedPart: undefined});
    }

    onFilterCategoryChange(evt) {
        const {dispatch, fetchParts, filters} = this.props;
        const categoryId = evt.target.value;
        this.setState({
            categoryId
        });
        dispatch(fetchParts(1, {
            ...filters,
            category_id: categoryId
        }));
    }

    render() {
        return (
            <div>
                <PartFilterForm optionValueList={this.props.partCategories}
                                selectedCategory={this.state.categoryId}
                                onChangeCategory={this.onFilterCategoryChange} />
                <PartList parts={this.props.parts} />
            </div>
        );
    }
}

PartListPage.propTypes = {
    paginator: PropTypes.func.isRequired,
    stateSelector: PropTypes.func.isRequired,
    partCategories: PropTypes.array.isRequired,
    parts: PropTypes.array.isRequired,
    fetchParts: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
};

export const mapStateToProps = (state, ownProps) => {
    const {paginator, stateSelector} = ownProps;
    return {
        partCategories: state.partCategories.items,
        parts: paginator.selectors.getCurrentPageItems(stateSelector(state)),
        fetchParts: paginator.navigation.fetchPage(stateSelector(state)),
        filters: paginator.selectors.getFilters(stateSelector(state))
    };
};

export default connect(mapStateToProps)(PartListPage);