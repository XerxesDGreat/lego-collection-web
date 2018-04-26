import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {white} from "material-ui/styles/colors";
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt';
import ViewAgenda from 'material-ui/svg-icons/action/view-agenda';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSetsExpanded: false,
            isPartsExpanded: false
        };

        this.setFilterClickHelper = this.setFilterClickHelper.bind(this);
        this.partFilterClickHelper = this.partFilterClickHelper.bind(this);
    }

    onExpandSets = (item) => {
        this.setState({
            isSetsExpanded: item.state.open
        })
    };

    onExpandParts = (item) => {
        this.setState({
            isPartsExpanded: item.state.open
        })
    };

    setFilterClickHelper(selectionType) {
        const props = this.props;
        return function(evt) {
            props.onSetFilterSelection(selectionType);
        }
    }

    partFilterClickHelper(selectionType) {
        const props = this.props;
        return function(evt) {
            props.onPartFilterSelection(selectionType);
        }
    }


    render() {
        return (
            <List>
                <ListItem primaryText="My Sets"
                          leftIcon={<ViewQuilt color={white}/>}
                          initiallyOpen={true}
                          primaryTogglesNestedList={true}
                          onNestedListToggle={this.onExpandSets}
                          nestedItems={[
                              <ListItem key="all"
                                        primaryText="All"
                                        onClick={this.setFilterClickHelper('all')} />,
                              <ListItem key="display"
                                        primaryText="On Display"
                                        onClick={this.setFilterClickHelper('display')} />,
                              <ListItem key="storage"
                                        primaryText="In Storage"
                                        onClick={this.setFilterClickHelper('storage')} />
                          ]}
                />
                <ListItem primaryText="My Parts"
                          leftIcon={<ViewAgenda color={white}/>}
                          onClick={(evt) => this.setSelectedSection('parts')}
                          initiallyOpen={true}
                          primaryTogglesNestedList={true}
                          onNestedListToggle={this.onExpandParts}
                          nestedItems={[
                              <ListItem key="all"
                                        primaryText="All"
                                        onClick={this.partFilterClickHelper('all')} />,
                              <ListItem key="display"
                                        primaryText="On Display"
                                        onClick={this.partFilterClickHelper('display')} />,
                              <ListItem key="storage"
                                        primaryText="In Storage"
                                        onClick={this.partFilterClickHelper('storage')} />
                          ]}
                />
            </List>
        );
    }
}

export default Menu;