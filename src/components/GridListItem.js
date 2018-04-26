import React, {Component} from "react";
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {GridTile} from 'material-ui/GridList';


class GridListItem extends Component {
    constructor(props) {
        super(props);
        this.img = <img src={this.props.imgUrl}
                        alt={"Image for " + this.props.num}
                        height={this.props.cellHeight} />;
    }

    render() {
        const {name, num, imgUrl, cellHeight} = this.props;
        const actionIcon = (
            <IconButton>
                <StarBorder color="white" />
            </IconButton>
        );

        return (
            <GridTile title={name}
                      actionIcon={actionIcon}
                      subtitle={num}
                      onClick={this.props.onClick}>
                {this.img}
            </GridTile>
        );
    }
}

export default GridListItem;