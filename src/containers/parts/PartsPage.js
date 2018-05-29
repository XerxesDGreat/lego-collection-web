import React from 'react';
import {connect} from 'react-redux';
import {fetchPartCategoriesIfNeeded} from '../../actions/partCategoryActions';
import {fetchParts} from '../../actions/partActions';
import queryString from 'query-string';
import PartListContainer from '../../containers/parts/PartListContainer';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import PartFilterForm from '../../components/parts/PartFilterForm';

class PartsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPart: undefined,
            categoryId: this.getCategoryIdFromQueryString()
        };

        this.onPartCardClick = this.onPartCardClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onFilterCategoryChange = this.onFilterCategoryChange.bind(this);
    }

    getCategoryIdFromQueryString() {
        const queryArgs = this.getQueryArguments();
        return ('categoryId' in queryArgs) ? queryArgs['categoryId'] : undefined;
    }

    getQueryArguments() {
        return queryString.parse(this.props.location.search);
    }

    componentDidMount() {
        //this.props.dispatch(fetchPartCategoriesIfNeeded());
        //this.props.dispatch(this.getFetchPartsAction());
    }

    getFetchPartsAction() {
        return fetchParts({categoryId: this.state.categoryId});
    }

    componentDidUpdate() {
        console.log("PartsPage component updated");
    };

    updateUrl() {
        const newLocation = Object.assign({}, this.props.location);
        const queryParams = queryString.parse(newLocation.search);
        queryParams['categoryId'] = this.state.categoryId;
        newLocation.search = queryString.stringify(queryParams);
        this.props.history.push(newLocation);
    }

    onPartCardClick(part) {
        //this.setState({selectedPart: part});
    }

    onCloseModal() {
        this.setState({selectedPart: undefined});
    }

    onFilterCategoryChange(evt) {
        this.setState({
            categoryId: evt.target.value
        });
        this.updateUrl();
    }

    render() {
        const menuItems = {
            "Home": "/",
            "Parts": "/parts",
            "This Category": null
        };
        return (
            <div>
                <Breadcrumbs menuItems={menuItems}/>
                <PartListContainer categoryId={this.state.categoryId}
                />
            </div>
        );
    }
}
/*

                <PartFilterForm optionValueList={this.props.partCategories}
                                selectedCategory={this.state.categoryId}
                                onChangeCategory={this.onFilterCategoryChange}
                />
 */

const mapStateToProps = state => {
    return {
        partCategories: state.partCategories.items
    };
};

export default connect(mapStateToProps)(PartsPage);