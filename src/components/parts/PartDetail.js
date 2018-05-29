import React from 'react';
import PropTypes from 'prop-types';
import {Media, Grid, Row, Col} from 'react-bootstrap';

const PartDetail = props => (
    props.part === undefined ?
        "" :
        <Grid>
            <Row>
                <Col mdOffset={2} md={8}>
                    <Media>
                        <Media.Left>
                            <img src={props.part.thumbnail}
                                 alt={"Image for " + props.part.partNum} />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{props.part.partNum} - {props.part.name}</Media.Heading>
                            {props.children}
                        </Media.Body>
                    </Media>
                </Col>
            </Row>
        </Grid>
);

PartDetail.propTypes = {
    part: PropTypes.shape({
        partNum: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        categoryId: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired
    })
};

export default PartDetail;