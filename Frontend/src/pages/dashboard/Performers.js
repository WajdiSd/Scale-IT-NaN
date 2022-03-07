import React from 'react';
import { Card, CardBody, Media, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import avatarImg1 from '../../assets/images/users/avatar-1.jpg';
import avatarImg4 from '../../assets/images/users/avatar-4.jpg';
import avatarImg5 from '../../assets/images/users/avatar-5.jpg';
import avatarImg7 from '../../assets/images/users/avatar-7.jpg';
import avatarImg9 from '../../assets/images/users/avatar-9.jpg';


const Member = ({ image, name, description, className }) => {
    return (

        <Media className="mt-1 border-top pt-3">
            <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{description}</h6>
            </Media>
            <UncontrolledButtonDropdown className="align-self-center float-right">
                <DropdownToggle tag="button" className='btn btn-link p-0 dropdown-toggle text-muted'>
                    <i className="uil uil-ellipsis-v"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <i className="uil uil-edit-alt mr-2"></i>Edit
                    </DropdownItem>
                    <DropdownItem>
                        <i className="uil uil-exit mr-2"></i>Remove from Team
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="text-danger">
                        <i className="uil uil-trash mr-2"></i>Delete
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </Media>
    )
}


const Performers = () => {
    return (
        <Card>
            <CardBody className="pb-0 pt-2">
                <h5 className="mb-3 header-title">Top Performers</h5>

                <Member image={avatarImg7} name="Shreyu N" description="Senior Sales Guy" />
                <Member image={avatarImg9} name="Greeva Y" description="Social Media Campaign" />
                <Member image={avatarImg4} name="Nik G" description="Inventory Manager" />
                <Member image={avatarImg1} name="Hardik G" description="Sales Person" />
                <Member image={avatarImg5} name="Stacy K" description="Sales Person" className="mb-3" />

            </CardBody>
        </Card>
    );
};

export default Performers;
