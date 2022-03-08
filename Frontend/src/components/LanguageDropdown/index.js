// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap';
import { Globe } from 'react-feather';

import enFlag from './flags/us.jpg';
import germanyFlag from './flags/germany.jpg';
import italyFlag from './flags/italy.jpg';
import spainFlag from './flags/spain.jpg';
import russiaFlag from './flags/russia.jpg';

const Languages = [
    {
        name: 'English',
        flag: enFlag,
    },
    {
        name: 'German',
        flag: germanyFlag,
    },
    {
        name: 'Italian',
        flag: italyFlag,
    },
    {
        name: 'Spanish',
        flag: spainFlag,
    },
    {
        name: 'Russian',
        flag: russiaFlag,
    },
];


class LanguageDropdown extends Component {
    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.state = {
            dropdownOpen: false,
        };
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    render() {
        const tag = this.props.tag || "div";

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} className="d-none d-lg-block" tag={tag} id="langDropdown">
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="a"
                        className="nav-link mr-0"
                        onClick={this.toggleDropdown}
                        aria-expanded={this.state.dropdownOpen}>
                        <Globe />
                    </DropdownToggle>
                    <DropdownMenu right className="">
                        <div onClick={this.toggleDropdown}>
                            {Languages.map((lang, i) => {
                                return (
                                    <Link to="/" className="dropdown-item notify-item" key={i + '-lang'}>
                                        <img src={lang.flag} alt={lang.name} className="mr-1" height="12" />{' '}
                                        <span className="align-middle">{lang.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </DropdownMenu>
                </Dropdown>

                <UncontrolledTooltip placement="left" target="langDropdown">Change language</UncontrolledTooltip>
            </React.Fragment>
        );
    }
}

export default LanguageDropdown;
