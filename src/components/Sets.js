import React, {Component} from 'react';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CircularProgress from 'material-ui/CircularProgress';
import {getAllSets} from "../repository/Repo";

export class SetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: [],
            setsLastFetched: 0
        }
    }

    componentDidMount() {
        getAllSets().then(response => {
                const setList = Object.values(response.data.sets);
                const sleep = function(time) {
                    return new Promise((resolve) => setTimeout(resolve, time));
                };
                sleep(1000).then(() => {
                    // this.setState({
                    //     sets: setList,
                    //     setsLastFetched: new Date()
                    // });
                });
            })
            .catch(error => console.log(error));
    }

    generateSetListItem(set) {
        return (<SetListItem set={set} key={set.name} />);
    }

    render() {
        if (this.state.sets.length > 0) {
            return (
                <GridList cellHeight={220}
                          cols={3}>
                    {this.state.sets.map(set => this.generateSetListItem(set))}
                </GridList>
            );
        } else {
            return (
                <div style={{width: '100%', textAlign: 'center', paddingTop: '100px'}}>
                    <CircularProgress size={80} thickness={5} />
                </div>
            )
        }
    }
}

export class SetListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imgSrc = 'https://images.brickset.com/sets/small/_setnum_.jpg';
        const {name, num} = this.props.set;
        return (
            <GridTile title={name}
                      subtitle={num}
                      actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
                <img src={imgSrc.replace('_setnum_', num)}
                     alt={"Image for " + num} />
            </GridTile>
        );
    }
}