// @flow
import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import { changeSidebarTheme, changeSidebarType } from '../redux/actions';
import * as layoutConstants from '../constants/layout';

import ThemeCustomizer from '../components/ThemeCustomizer';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const LeftSidebar = React.lazy(() => import('../components/LeftSidebar'));
const Topbar = React.lazy(() => import('../components/Topbar'));
const Footer = React.lazy(() => import('../components/Footer'));
const RightSidebar = React.lazy(() => import('../components/RightSidebar'));


// loading
const emptyLoading = () => <div></div>;
const loading = () => <div className="text-center"></div>;


class VerticalLayout extends Component {
    constructor(props) {
        super(props);
        this.openLeftMenu = this.openLeftMenu.bind(this);
    }

    /**
     * Opens the left menu - mobile
     */
    openLeftMenu = () => {
        if (document.body) {
            if (document.body.classList.contains("sidebar-enable")) {
                document.body.classList.remove("sidebar-enable");
                this.props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
            } else {
                if (document.body.classList.contains("left-side-menu-condensed"))
                    document.body.classList.remove("left-side-menu-condensed");
                document.body.classList.add("sidebar-enable");
            }
        }
    };

    componentDidMount = () => {
        // activate the condensed sidebar if smaller devices like ipad or tablet
        if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
            this.props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
        }
    };

    render() {
        // get the child view which we would like to render
        const children = this.props.children || null;

        const isCondensed = this.props.layout.leftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED;
        const isLight = this.props.layout.leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT;

        return (
            <div className="app">
                <div id="wrapper">
                    <Suspense fallback={emptyLoading()}>
                        <Topbar openLeftMenuCallBack={this.openLeftMenu} {...this.props} />
                    </Suspense>
                    <Suspense fallback={emptyLoading()}>
                        <LeftSidebar
                            isCondensed={isCondensed}
                            isLight={isLight}
                            {...this.props}
                        />
                    </Suspense>

                    <div className="content-page">
                        <div className="content">
                            <Container fluid>
                                <Suspense fallback={loading()}>{children}</Suspense>
                            </Container>
                        </div>

                        <Suspense fallback={emptyLoading()}>
                            <Footer {...this.props} />
                        </Suspense>
                    </div>
                </div>

                <Suspense fallback={emptyLoading()}>
                    <RightSidebar title="Customize" {...this.props}>
                        <ThemeCustomizer />
                    </RightSidebar>
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.Layout,
    };
};
export default connect(
    mapStateToProps,
    { changeSidebarTheme, changeSidebarType }
)(VerticalLayout);
