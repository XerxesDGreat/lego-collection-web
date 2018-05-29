import React from 'react';
import {fetchPartCategoriesIfNeeded} from '../../actions/partCategoryActions';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import PartCategoryList from '../../components/parts/PartCategoryList';
import Breadcrumbs from "../../components/common/Breadcrumbs";

class PartCategoriesPage extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchPartCategoriesIfNeeded());
    }

    componentDidUpdate() {
        console.log("component did update");
    }

    render() {
        const menuItems = {
            "Home": "/",
            "Parts": null
        };
        return (
            <div>
                <Breadcrumbs menuItems={menuItems}/>
                <PartCategoryList partCategories={this.props.partCategories} />
            </div>
        );
    }
}

PartCategoriesPage.propTypes = {
    partCategories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    // if we want to filter, this is where we can do it
    return {
        partCategories: state.partCategories.items
    }
};

export default connect(mapStateToProps)(PartCategoriesPage);