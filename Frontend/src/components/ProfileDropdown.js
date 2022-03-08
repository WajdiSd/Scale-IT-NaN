import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { ChevronDown } from 'react-feather';

class ProfileDropdown extends Component {
    constructor(props) {
        super(props);

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    /*:: toggleDropdown: () => void */
    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const profilePic = this.props.profilePic || null;
        const tag = this.props.tag || "div";

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} className="notification-list align-self-center profile-dropdown" tag={tag}>
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="a"
                    className="nav-link dropdown-toggle nav-user mr-0 mr-0"
                    onClick={this.toggleDropdown} aria-expanded={this.state.dropdownOpen}>

                    <div className="media user-profile ">
                        <img src={profilePic} alt={this.props.username} className="rounded-circle align-self-center" />
                        <div className="media-body text-left">
                            <h6 className="pro-user-name ml-2 my-0">
                                <span>{this.props.username}</span>
                                <span className="pro-user-desc text-muted d-block mt-1">{this.props.description} </span>
                            </h6>
                        </div>
                        <ChevronDown className="ml-2 align-self-center"></ChevronDown>
                    </div>
                </DropdownToggle>
                <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                    <div onClick={this.toggleDropdown}>
                        {this.props.menuItems.map((item, i) => {
                            const Icon = item.icon;
                            return <React.Fragment key={i + "-profile-menu"}>
                                {item.hasDivider ? <DropdownItem divider /> : null}
                            <Link to={item.redirectTo} className="dropdown-item notify-item">
                                    <Icon className="icon-dual icon-xs mr-2"></Icon>
                                    <span>{item.label}</span>
                                </Link>
                            </React.Fragment>
                        })}
                    </div>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default ProfileDropdown;