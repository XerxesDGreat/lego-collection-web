import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Breadcrumbs extends React.Component {
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {Object.keys(this.props.menuItems).map(key => {
                        let breadcrumbClass = "breadcrumb-item";
                        let breadcrumbContent = key;
                        const value = this.props.menuItems[key];
                        if (value === null) {
                            breadcrumbClass += " active";
                        } else {
                            breadcrumbContent = <Link to={value}>{breadcrumbContent}</Link>
                        }
                        return (
                            <li className={breadcrumbClass} key={"breadcrumbItem" + value}>
                                {breadcrumbContent}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        )
    }
}

Breadcrumbs.propTypes = {
    menuItems: PropTypes.object.isRequired
};

export default Breadcrumbs;