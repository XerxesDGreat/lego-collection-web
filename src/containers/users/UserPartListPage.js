import React from 'react';
import PropTypes from 'prop-types';
import UserPartList from '../../components/users/UserPartList';
import {connect} from 'react-redux';
import {userPartsPaginator} from "../../modules/userParts";

export class UserPartListPage extends React.Component {
    componentDidMount() {
        const {dispatch, fetchPage} = this.props;
        dispatch(fetchPage());
    }

    render() {
        return <UserPartList elements={this.props.elements}/>
    }
}

UserPartListPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    elements: PropTypes.array.isRequired,
    fetchPage: PropTypes.func.isRequired
};

export const mapStateToProps = state => {
    const {userParts} = state;
    return {
        elements: userPartsPaginator.selectors.getCurrentPageItems(userParts),
        fetchPage: userPartsPaginator.navigation.fetchPage(userParts),
    }
};

export default connect(mapStateToProps)(UserPartListPage);