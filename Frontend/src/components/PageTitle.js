import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

/**
 * Renders the PageTitle
 */
const PageTitle = (props) => {
    const title = props.title || "";
    const items = props.breadCrumbItems || "";
    return (
        <React.Fragment>
            
            <Breadcrumb className="float-right mt-1 font-size-14">
                <BreadcrumbItem>
                    <Link to="/">Shreyu</Link>
                </BreadcrumbItem>
                {items.map((item, index) => {
                    return item.active ? (
                        <BreadcrumbItem active key={index}>
                            {item.label}
                        </BreadcrumbItem>
                    ) : (
                            <BreadcrumbItem key={index}>
                                <Link to={item.path}>{item.label}</Link>
                            </BreadcrumbItem>
                        );
                })}
            </Breadcrumb>

            <h4 className="mb-1 mt-0">{title}</h4>
        </React.Fragment>
    )
}

export default PageTitle;