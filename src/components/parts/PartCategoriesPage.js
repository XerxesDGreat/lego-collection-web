import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PartCategoryList from './PartCategoryList';

class PartCategoriesPage extends React.Component {
    render() {
        const partCategories = this.props.partCategories;
        return (
            <div>
                <PartCategoryList partCategories={partCategories} />
            </div>
        );
    }
}

PartCategoriesPage.propTypes = {
    partCategories: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        partCategories: state.partCategories
    }
}

export default connect(mapStateToProps)(PartCategoriesPage);