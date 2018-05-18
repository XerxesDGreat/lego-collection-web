import React, {Component} from 'react';
import {GridList} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {getAllSets, updateSetOnDisplay} from "../repository/Repo";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import GridListItem from "./GridListItem";

const imgSrcSmallPattern = 'https://images.brickset.com/sets/small/_setnum_.jpg';
const imgSrcLargePattern = 'https://images.brickset.com/sets/large/_setnum_.jpg';

const setFilters = {
    'all': function(set) { return true; },
    'display': function(set) { return set.onDisplay; },
    'storage': function(set) { return !set.onDisplay; }
};

export class SetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: [],
            setsLastFetched: 0,
            setDialogOpen: false,
            selectedSet: null,
            fetchCompleted: false
        };

        this.handleUpdateOnDisplay = this.handleUpdateOnDisplay.bind(this);
        this.onReceivedAllSets = this.onReceivedAllSets.bind(this);
    }

    onReceivedAllSets(response) {
        const setList = Object.values(response.data.data);
        this.setState({
            sets: setList,
            setsLastFetched: new Date(),
            fetchCompleted: true
        });
    }

    componentDidMount() {
        getAllSets()
            .then(this.onReceivedAllSets)
            .catch(error => console.log(error));
    }

    generateSetListItem(set) {
        return (
            <GridListItem name={set.name}
                          num={set.num}
                          key={set.num}
                          imgUrl={imgSrcSmallPattern.replace('_setnum_', set.num)}
                          onClick={(evt) => this.handleSetListOpen(set)} />
        );
    }

    handleSetListOpen(set) {
        console.log(set);
        this.setState({
            setDialogOpen: true,
            selectedSet: set
        });
    }

    handleSetListClose = () => {
        this.setState({
            setDialogOpen: false,
            selectedSet: null
        });
    };

    handleUpdateOnDisplay(newOnDisplayValue) {
        this.setState((oldState, props) => {
            oldState.selectedSet.onDisplay = newOnDisplayValue;
            return oldState
        });
    }

    render() {
        const {sets, setDialogOpen, selectedSet, fetchCompleted} = this.state;

        if (!fetchCompleted) {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    <CircularProgress size={80} thickness={5} />
                </div>
            );
        }

        const filteredSets = sets.filter(setFilters[this.props.filter]);
        if (filteredSets.length > 0) {
            return (
                <div>
                    <GridList cellHeight={220}
                              cols={3}>
                        {filteredSets.map(set => this.generateSetListItem(set))}
                    </GridList>
                    <SetListDetail set={selectedSet}
                                   isOpen={setDialogOpen}
                                   handleClose={this.handleSetListClose}
                                   updateOnDisplay={this.handleUpdateOnDisplay}
                    />
                </div>
            );
        } else {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    {"No sets fit the " + this.props.filter +  " filter"}
                </div>
            )
        }
    }
}

class SetListDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleDisabled: false,
            onDisplay: this.props.set ? this.props.set.onDisplay : false
        };

        this.onToggleChange = this.onToggleChange.bind(this);
    }

    onToggleChange(evt, isInputChecked) {
        const oldVal = this.props.set.onDisplay;
        this.setState({
            toggleDisabled: true,
        });

        updateSetOnDisplay(this.props.set.num, isInputChecked)
            .then((resp) => {
                this.props.updateOnDisplay(resp.data.onDisplay)
            })
            .catch((error) => {
                console.log(error);
                this.props.updateOnDisplay(oldVal);
            })
            .finally(() => {
                this.setState({
                    toggleDisabled: false
                });
            });
    }

    // {"name":"TIE Fighter","quantityOwned":1,"onDisplay":false,"num":"9492-1","num_parts":413,"year":2012,"theme_id":169}
    render() {
        const {set, handleClose, isOpen} = this.props;

        if (set == null) {
            return "";
        }

        return (
            <Dialog title={set.name}
                    actions={[<FlatButton label="Close" primary={true} onClick={handleClose} />]}
                    modal={false}
                    open={isOpen}
                    onRequestClose={handleClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={true}
            >
                <Card>
                    <CardMedia>
                        <div style={{height:400, textAlign:'center'}}>
                            <img src={imgSrcLargePattern.replace('_setnum_', set.num)}
                                 alt={"Image for " + set.num}
                                 style={{height:400}}
                            />
                        </div>
                    </CardMedia>
                    <CardTitle title={set.name} subtitle={set.num} />
                    <CardText>
                        {set.numParts + " Parts"}
                    </CardText>
                    <CardText>
                        <TextField name="owned"
                                   floatingLabelText={"Quantity Owned"}
                                   floatingLabelFixed={true}
                                   value={set.quantityOwned}
                        />
                    </CardText>
                    <CardText>
                        <Toggle toggled={set.onDisplay}
                                label={"On Display"}
                                style={{width: 250}}
                                disabled={this.state.toggleDisabled}
                                onToggle={this.onToggleChange}
                        />
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}
