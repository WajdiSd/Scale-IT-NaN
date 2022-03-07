import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap';
import { Bell } from 'react-feather';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const notificationContainerStyle = {
    'maxHeight': '230px'
};


class NotificationDropdown extends Component {

    static defaultProps = {
        notifications: []
    }

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

    getRedirectUrl = (item) => {
        return `/notification/${item.id}`;
    }

    render() {
        const tag = this.props.tag || "div";

        return (
            <React.Fragment>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} className="notification-list" tag={tag} id="notiDropdown">
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="a"
                    className="nav-link dropdown-toggle" onClick={this.toggleDropdown} aria-expanded={this.state.dropdownOpen}>
                    <Bell />
                    <span className="noti-icon-badge"></span>
                </DropdownToggle>
                <DropdownMenu right className="dropdown-lg">
                    <div onClick={this.toggleDropdown}>
                        <div className="dropdown-item noti-title border-bottom">
                            <h5 className="m-0 font-size-16">
                                <span className="float-right">
                                    <Link to="/notifications" className="text-dark">
                                        <small>Clear All</small>
                                    </Link>
                                </span>Notification
                                </h5>
                        </div>
                        <PerfectScrollbar style={notificationContainerStyle}>
                            {this.props.notifications.map((item, i) => {
                                return <Link to={this.getRedirectUrl(item)} className="dropdown-item notify-item" key={i + "-noti"}>
                                    <div className={`notify-icon bg-${item.bgColor}`}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <p className="notify-details">{item.text}
                                        <small className="text-muted">{item.subText}</small>
                                    </p>
                                </Link>
                            })}
                        </PerfectScrollbar>

                        <Link to="/" className="dropdown-item text-center text-primary notify-item notify-all border-top">View All</Link>
                    </div>
                </DropdownMenu>
            </Dropdown>

            <UncontrolledTooltip placement="left" target="notiDropdown">{this.props.notifications.length} new unread notificationse</UncontrolledTooltip>
            </React.Fragment>
        );
    }
}

export default NotificationDropdown;