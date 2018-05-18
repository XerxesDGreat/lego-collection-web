import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {SetList} from "./components/Sets";
//import {PartList} from "./components/Parts";
import Header from './common/Header';
//import Menu from "./components/Menu";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: null,
            setFilter: 'all'
        };

        this.setSetFilterSelection = this.setSetFilterSelection.bind(this);
        this.setPartFilterSelection = this.setPartFilterSelection.bind(this);
    }

    setSetFilterSelection(setFilterSelection) {
        this.setState({
            selectedSection: 'sets',
            setFilter: setFilterSelection
        });
    }

    setPartFilterSelection(partFilterSelection) {
        this.setState({
            selectedSection: 'parts',
            partFilter: partFilterSelection
        });
    }

    // renderSetSection() {
    //     return <SetList filter={this.state.setFilter}/>
    // }
    //
    // renderPartSection() {
    //     return <PartList filter={this.state.partFilter} />
    // }

    renderSectionByState(selectedSection) {
        return <div>app</div>;
        // switch (selectedSection) {
        //     case 'sets':
        //         return this.renderSetSection();
        //     case 'parts':
        //         return this.renderPartSection();
        //     default:
        //         return <div>hello</div>;
        // }
    }


// <div className="menuContainer">
// <Menu onSetFilterSelection={this.setSetFilterSelection}
// onPartFilterSelection={this.setPartFilterSelection}
// />
// </div>
// <div className="detailContainer">
//     {detail}
// </div>

    render() {
        console.log("app");
        //const detail = this.renderSectionByState(this.state.selectedSection);

        return (
            <MuiThemeProvider>
                <div className="container-fluid">
                    "yo"
                </div>
            </MuiThemeProvider>
        );
    }
}

// App.propTypes = {
//     children: PropTypes.object.isRequired
// };

export default App;
