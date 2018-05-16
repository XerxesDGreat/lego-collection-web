import React, {Component} from 'react';
import {GridList} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {getAllParts} from "../repository/Repo";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import GridListItem from "./GridListItem";
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui/Table';

const partFilters = {
    'all': function(part) { return true; },
    'display': function(part) { return part.display > 0; },
    'storage': function(part) { return part.storage > 0; }
};

// @todo for infinite scrolling, check out https://github.com/seatgeek/react-infinite
export class PartList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parts: [],
            partsLastFetched: 0,
            partDialogOpen: false,
            selectedPart: null,
            fetchCompleted: false
        };

        this.cellHeight=220;

        this.handleUpdateOnDisplay = this.handleUpdateOnDisplay.bind(this);
        this.onReceivedAllParts = this.onReceivedAllParts.bind(this);
    }

    onReceivedAllParts(response) {
        const partList = Object.values(response.data.data.parts);

        this.setState({
            parts: partList,
            partsLastFetched: new Date(),
            fetchCompleted: true
        });
    }

    componentDidMount() {
        getAllParts()
            .then(this.onReceivedAllParts)
            .catch(error => console.log(error));
    }

    generatePartListItem(part) {
        return (
            <GridListItem name={part.name}
                          num={part.partNum}
                          key={part.partNum}
                          imgUrl={part.thumbnail}
                          onClick={(evt) => this.handlePartListOpen(part)}
                          cellHeight={this.cellHeight}
            />
        );
    }

    handlePartListOpen(part) {
        console.log(part);
        this.setState({
            partDialogOpen: true,
            selectedPart: part
        });
    }

    handlePartListClose = () => {
        this.setState({
            partDialogOpen: false,
            selectedPart: null
        });
    };

    handleUpdateOnDisplay(newOnDisplayValue) {
        this.setState((oldState, props) => {
            oldState.selectedPart.onDisplay = newOnDisplayValue;
            return oldState
        });
    }

    render() {
        const {parts, partDialogOpen, selectedPart, fetchCompleted} = this.state;

        if (!fetchCompleted) {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    <CircularProgress size={80} thickness={5} />
                </div>
            );
        }

        const filteredParts = parts.filter(partFilters[this.props.filter]);
        if (filteredParts.length > 0) {
            return (
                <div>
                    <GridList cellHeight={this.cellHeight}
                              cols={3}>
                        {filteredParts.map(set => this.generatePartListItem(set))}
                    </GridList>
                    {selectedPart &&
                        <PartListDetail part={selectedPart}
                                        isOpen={partDialogOpen}
                                        handleClose={this.handlePartListClose}
                                        updateOnDisplay={this.handleUpdateOnDisplay}
                                        imgSrc={selectedPart.thumbnail}
                        />}
                </div>
            );
        } else {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    {"No parts fit the " + this.props.filter +  " filter"}
                </div>
            )
        }
    }
}

class PartListDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //toggleDisabled: false,
            //onDisplay: this.props.part ? this.props.part.onDisplay : false
        };

    }

    // {"name":"TIE Fighter","quantityOwned":1,"onDisplay":false,"num":"9492-1","num_parts":413,"year":2012,"theme_id":169}
    render() {
        const {part, handleClose, isOpen} = this.props;

        return (
            <Dialog title={part.name}
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
                            <img src={part.thumbnail}
                                 alt={"Image for " + part.partNum}
                                 style={{height:400}}
                            />
                        </div>
                    </CardMedia>
                    <CardTitle title={part.name} subtitle={part.partNum} />
                    <CardText>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Color</TableHeaderColumn>
                                    <TableHeaderColumn>On Display</TableHeaderColumn>
                                    <TableHeaderColumn>In Storage</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableRowColumn>All Colors</TableRowColumn>
                                    <TableRowColumn>{part.display}</TableRowColumn>
                                    <TableRowColumn>{part.storage}</TableRowColumn>
                                </TableRow>
                                {Object.keys(part.colors).map((colorKey) => {
                                    return (
                                        <TableRow>
                                            <TableRowColumn>{colorKey}</TableRowColumn>
                                            <TableRowColumn>{part.colors[colorKey].display}</TableRowColumn>
                                            <TableRowColumn>{part.colors[colorKey].storage}</TableRowColumn>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}
