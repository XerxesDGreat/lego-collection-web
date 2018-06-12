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
                            <img src={props.part.thumbnail_url}
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
        part_num: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.number.isRequired,
        thumbnail_url: PropTypes.string.isRequired
    })
};

export default PartDetail;