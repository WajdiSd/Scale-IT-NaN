import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MetisMenu from 'metismenujs/dist/metismenujs';

import { initMenu, changeActiveMenuFromLocation } from '../redux/actions';


const MenuItemWithChildren = ({ item, linkClassNames, subMenuClassNames, activatedMenuItemIds }) => {
    const Icon = item.icon || null;
    return (
        <li className={classNames('side-nav-item', { 'mm-active': activatedMenuItemIds.indexOf(item.id) >= 0 })}>
            <Link
                to="/"
                className={classNames('side-sub-nav-link', linkClassNames)}
                aria-expanded={activatedMenuItemIds.indexOf(item.id) >= 0}>
                {item.icon && <Icon />}
                {item.badge && (
                    <span className={`badge badge-${item.badge.variant} float-right`}>{item.badge.text}</span>
                )}
                <span> {item.name} </span>
                <span className="menu-arrow"></span>
            </Link>

            <ul
                className={classNames(subMenuClassNames, 'mm-collapse', {
                    'mm-collapsed mm-show': activatedMenuItemIds.indexOf(item.id) >= 0,
                })}
                aria-expanded={activatedMenuItemIds.indexOf(item.id) >= 0}>
                {item.children.map((child, i) => {
                    return (
                        <React.Fragment key={i}>
                            {child.children ? (
                                <MenuItemWithChildren
                                    item={child}
                                    linkClassNames=""
                                    activatedMenuItemIds={activatedMenuItemIds}
                                    subMenuClassNames="side-nav-third-level"
                                />
                            ) : (
                                    <MenuItem
                                        item={child}
                                        className={classNames({ active: activatedMenuItemIds.indexOf(child.id) >= 0 })}
                                        linkClassName=""
                                    />
                                )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }) => {
    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} />
        </li>
    );
};

const MenuItemLink = ({ item, className }) => {
    const Icon = item.icon || null;
    return (
        <Link to={item.path} className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}>
            {item.icon && <Icon />}
            {item.badge && <span className={`font-size-12 badge badge-${item.badge.variant} float-right`}>{item.badge.text}</span>}
            <span> {item.name} </span>
        </Link>
    );
};

/**
 * Renders the application menu
 */

class AppMenu extends Component {
    menuRef = null;

    static defaultProps = {
        mode: 'vertical',
    };

    componentDidMount = () => {
        if (!this.props.menu.menuItems) this.props.initMenu();
        else this.initMenu();

        this.props.history.listen((location, action) => {
            // hide menus in mobile
            document.body.classList.remove('sidebar-enable');
            this.props.changeActiveMenuFromLocation();
        });
    };

    componentDidUpdate = prevProps => {
        if (
            !prevProps.menu.menuItems ||
            (prevProps.menu.menuItems && prevProps.menu.menuItems !== this.props.menu.menuItems)
        ) {
            this.initMenu();
        }

        if (!this.props.menu.activatedMenuItemIds) {
            this.props.changeActiveMenuFromLocation();
        }
    };

    initMenu() {
        if (this.props.mode === 'horizontal') {
            const menuRef = this.menuRef = new MetisMenu('#menu-bar').on('shown.metisMenu', function(event) {
                window.addEventListener('click', function menuClick(e) {
                    if (!event.target.contains(e.target)) {
                        menuRef.hide(event.detail.shownElement);
                        window.removeEventListener('click', menuClick);
                    }
                });
            });
        } else {
            this.menuRef = new MetisMenu('#menu-bar');
        }
    }

    render() {
        const isHorizontal = this.props.mode === 'horizontal';
        const activatedKeys = isHorizontal ? [] : this.props.menu ? (this.props.menu.activatedMenuItemIds? this.props.menu.activatedMenuItemIds :[]) : [] || [];

        return (
            <React.Fragment>
                
                        {this.props.menu && this.props.menu.menuItems && (
                            <ul className="metismenu" id="menu-bar">
                                {this.props.menu.menuItems.map((item, i) => {
                                    return (
                                        <React.Fragment key={item.id}>
                                            {item.header && !isHorizontal && (
                                                <li className="menu-title" key={i + '-el'}>
                                                    {item.header}
                                                </li>
                                            )}

                                            {item.children ? (
                                                <MenuItemWithChildren
                                                    item={item}
                                                    subMenuClassNames="nav-second-level"
                                                    activatedMenuItemIds={activatedKeys}
                                                    linkClassNames="side-nav-link"
                                                />
                                            ) : (
                                                    <MenuItem
                                                        item={item}
                                                        className={classNames({ 'mm-active': activatedKeys.indexOf(item.id) >= 0 })}
                                                        linkClassName="side-nav-link"
                                                    />
                                                )}
                                        </React.Fragment>
                                    );
                                })}
                            </ul>
                        )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        menu: state.AppMenu,
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        { initMenu, changeActiveMenuFromLocation }
    )(AppMenu)
);
