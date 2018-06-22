import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ModelsPage from "../../components/models/ModelsPage";
import UserDashboardPage from "../users/UserDashboardPage";
import PartCategoriesPage from "../parts/PartCategoriesPage";
import PartListContainer from "../parts/PartListPage";
import UserLoginPage from "../users/UserLoginPage";
import ModelPage from "../../components/models/ModelPage";
import PartDetailPage from "../parts/PartDetailPage";
import AuthRequiredRoute from "./AuthRequiredRoute";
import Header from '../../components/common/Header';
import {connect} from "react-redux";
import {fetchLoggedInUser} from '../../modules/users';
import Home from "../../components/common/Home";
import {routes} from '../../config';
import {userPartsPaginator, moduleSelector as userPartsModuleSelector} from '../../modules/userParts';
import {partsPaginator, moduleSelector as partsModuleSelector} from '../../modules/parts';

class AppContainer extends React.Component {
    componentDidMount() {
        const {fetchLoggedInUser, dispatch} = this.props;
        dispatch(fetchLoggedInUser());
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header loggedInUser={this.props.user}/>
                    <div className='detailContainer'>
                        <div className='container'>
                            <Switch>
                                <Route path={routes.modelDetail} component={ModelPage}/>
                                <Route path={routes.modelList} component={ModelsPage}/>
                                <Route path={routes.partCategoryList} component={PartCategoriesPage}/>
                                <Route path={routes.partDetail} component={PartDetailPage} />
                                <Route path={routes.partList}
                                       render={props => <PartListContainer paginator={partsPaginator}
                                                                           stateSelector={partsModuleSelector}
                                                                           {...props} />} />
                                <Route path={routes.login} component={UserLoginPage} />
                                <AuthRequiredRoute path={routes.myDashboard} component={UserDashboardPage} />
                                <AuthRequiredRoute path={routes.myPartList}
                                                   component={PartListContainer}
                                                   componentProps={{
                                                       paginator: userPartsPaginator,
                                                       stateSelector: userPartsModuleSelector
                                                   }} />
                                <Route path={routes.home} component={Home}/>
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
        user: state.loggedInUser.user,
        fetchLoggedInUser: fetchLoggedInUser(state)
    };
};

export default connect(mapStateToProps)(AppContainer);