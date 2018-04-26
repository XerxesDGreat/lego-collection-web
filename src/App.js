import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {SetList} from "./components/Sets";
import {PartList} from "./components/Parts";
import Menu from "./components/Menu";

class App extends Component {
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

    renderSetSection() {
        return <SetList filter={this.state.setFilter}/>
    }

    renderPartSection() {
        return <PartList filter={this.state.partFilter} />
    }

    renderSectionByState(selectedSection) {
        switch (selectedSection) {
            case 'sets':
                return this.renderSetSection();
            case 'parts':
                return this.renderPartSection();
            default:
                return <div>hello</div>;
        }
    }

    render() {
        const detail = this.renderSectionByState(this.state.selectedSection);

        return (
            <MuiThemeProvider>
                <div id="container">
                    <div className="header">
                        <div className="App-header">
                            <img src="./cooltext283823557300489.png" alt="logo" />
                            <div className="App-intro">
                                Manage your LEGO sets here
                            </div>
                        </div>
                    </div>
                    <div className="menuContainer">
                        <Menu onSetFilterSelection={this.setSetFilterSelection}
                              onPartFilterSelection={this.setPartFilterSelection}
                        />
                    </div>
                    <div className="detailContainer">
                        {detail}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
