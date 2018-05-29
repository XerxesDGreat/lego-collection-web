import React from 'react';
import {fetchPartById} from "../../actions/partActions";
import {connect} from "react-redux";
import PartDetail from "../../components/parts/PartDetail";
import PartQuantityForm from "../../components/parts/PartQuantityForm";

class PartDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantityOwned: 3,
            isSaving: this.props.isSaving
        };

        this.onQuantityOwnedChange = this.onQuantityOwnedChange.bind(this);
    }

    componentDidMount() {
        const {dispatch, match} = this.props;
        dispatch(fetchPartById(match.params.id));
    }

    onQuantityOwnedChange(evt) {
        // @todo wire this up to the actual saves
        this.setState({
            quantityOwned: Number(evt.target.value),
            isSaving: true
        });
    }

    render() {
        console.log(this.state.quantityOwned);
        return (
            <PartDetail part={this.props.part}>
                <PartQuantityForm quantityOwned={this.state.quantityOwned}
                                  onChange={this.onQuantityOwnedChange}
                                  onBlur={() => console.log("blur")}
                                  isSaving={this.state.isSaving}
                />
            </PartDetail>
        );
    }
}

const mapStateToProps = state => {
    // if we want to filter, this is where we can do it
    return {
        part: state.currentPart.part,
        isFetching: state.currentPart.isFetching,
        isSaving: state.currentPart.isSaving
    }
};

export default connect(mapStateToProps)(PartDetailPage);