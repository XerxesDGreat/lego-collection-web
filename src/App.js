import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt';
import ViewAgenda from 'material-ui/svg-icons/action/view-agenda';
import {white} from 'material-ui/styles/colors';
import {SetList} from "./components/Sets";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: null
        };

        this.setSelectedSection = this.setSelectedSection.bind(this);
    }

    setSelectedSection(newSection) {
        return this.setState({selectedSection: newSection})
    }

    renderSetSection() {
        return <SetList />
    }

    renderPartSection() {
        return <div>Part stuff here</div>
    }

    renderMenu() {
        return (
            <List>
                <ListItem primaryText="Sets"
                          leftIcon={<ViewQuilt color={white}/>}
                          onClick={(evt) => this.setSelectedSection('sets')}
                />
                <ListItem primaryText="Parts"
                          leftIcon={<ViewAgenda color={white}/>}
                          onClick={(evt) => this.setSelectedSection('parts')}
                />
            </List>
        );
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
        const list = this.renderMenu();

        return (
            <MuiThemeProvider>
                <div id="container">
                    <div className="header">
                        <div className="App-header">
                            <img src="./cooltext283823557300489.png" />
                            <div className="App-intro">
                                Manage your LEGO sets here
                            </div>
                        </div>
                    </div>
                    <div className="menuContainer">
                        {list}
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
