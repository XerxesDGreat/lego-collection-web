import React, {Component} from 'react'
import {GridList} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {getAllSets, updateSetOnDisplay} from "../repository/Repo";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {sleep} from '../Util';
import GridListItem from "./GridListItem";

class LegoGridList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {items, dialogOpen, selectedItem, fetchCompleted} = this.state;

        if (!fetchCompleted) {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    <CircularProgress size={80} thickness={5} />
                </div>
            );
        }

        const filteredItems = sets.filter(this.props.filter);
        if (filteredItems.length > 0) {
            return (
                <div>
                    <GridList cellHeight={220}
                              cols={3}>
                        {filteredItems.map(item => this.props.generateCard(item))}
                    </GridList>
                    {this.props.generateDetailCard(selectedItem, dialogOpen, this.handleListClose, thisHandleUpdateOnDisplay)}
                    <ItemDetail item={selectedItem}
                                isOpen={dialogOpen}
                                handleClose={this.handleListClose}
                                updateOnDisplay={this.handleUpdateOnDisplay} />
                </div>
            );
        } else {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    {"No " + this.props.type + " fit the " + this.props.filter +  " filter"}
                </div>
            )
        }
    }
}

class LegoItemDetailDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleDisabled: false,
            onDisplay: this.props.item ? this.props.item.onDisplay : false
        };

        this.onToggleChange = this.onToggleChange.bind(this);
    }

    onToggleChange(evt, isInputChecked) {
        const oldVal = this.props.onDisplay;
        this.setState({
            toggleDisabled: true,
        });

        this.props.updateOperation(this.props.item, isInputChecked);
    }

    render() {
        const {item, itemName, itemNum, handleClose, imgSrc, isOpen} = this.props;

        if (item == null) {
            return "";
        }

        return (
            <Dialog title={name}
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
                            <img src={imgSrc}
                                 alt={"Image for " + itemNum}
                                 style={{height:400}}
                            />
                        </div>
                    </CardMedia>
                    <CardTitle title={itemName} subtitle={itemNum} />
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

class SetListDetail extends Component {

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

export default LegoGridList;