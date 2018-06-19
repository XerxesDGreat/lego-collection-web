import React from 'react'
import UserDashboard from '../../components/users/UserDashboard';
import {getLoggedInUser, fetchLoggedInUser} from "../../modules/users";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class UserDashboardPage extends React.Component {
    componentDidMount() {
        const {user, fetchLoggedInUser, dispatch} = this.props;
        if (!user) {
            dispatch(fetchLoggedInUser())
        }
    }

    render() {
        return <UserDashboard user={this.props.user} />;
    }
}

UserDashboardPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchLoggedInUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: getLoggedInUser(state),
    fetchLoggedInUser: fetchLoggedInUser(state)
});

export default connect(mapStateToProps)(UserDashboardPage);