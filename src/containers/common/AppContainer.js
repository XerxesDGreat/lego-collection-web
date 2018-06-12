import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ModelsPage from "../../components/models/ModelsPage";
import UserDashboardPage from "../users/UserDashboardPage";
import PartCategoriesPage from "../parts/PartCategoriesPage";
import PartsPage from "../parts/PartListPage";
import UserLoginPage from "../users/UserLoginPage";
import ModelPage from "../../components/models/ModelPage";
import PartDetailPage from "../parts/PartDetailPage";
import AuthRequiredRoute from "./AuthRequiredRoute";
import Header from '../../components/common/Header';
import {connect} from "react-redux";
import {fetchLoggedInUser} from '../../modules/users';

class AppContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchLoggedInUser());
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header loggedInUser={this.props.user}/>
                    <div className='detailContainer'>
                        <div className='container'>
                            <Switch>
                                <Route path='/models/:id' component={ModelPage}/>
                                <Route path='/models' component={ModelsPage}/>
                                <Route path='/part-categories' component={PartCategoriesPage}/>
                                <Route path='/parts/:id' component={PartDetailPage} />
                                <Route path='/parts' component={PartsPage} />
                                <Route path='/users/login' component={UserLoginPage} />
                                <AuthRequiredRoute path='/users/dashboard' component={UserDashboardPage} />
                                <Route path='/' component={AppContainer}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.loggedInUser.user
    };
};

export default connect(mapStateToProps)(AppContainer);