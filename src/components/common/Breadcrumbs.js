import React from 'react';
import {Link} from 'react-router-dom';

class Breadcrumbs extends React.Component {
    render() {
        console.log(this.props.menuItems);
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {Object.keys(this.props.menuItems).forEach((key) => {
                        let breadcrumbClass = "breadcrumb-item";
                        let breadcrumbContent = key;
                        if (this.props.menuItems[key] === null) {
                            breadcrumbClass += " active";
                        } else {
                            breadcrumbContent = <Link to={this.props.menuItems[key]}>{breadcrumbContent}</Link>
                        }
                        return <li className={breadcrumbClass}>{breadcrumbContent}</li>;
                    })}
                </ol>
            </nav>
        )
    }
}

export default Breadcrumbs;