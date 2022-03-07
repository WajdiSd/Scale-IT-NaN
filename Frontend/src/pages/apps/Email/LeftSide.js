import React from 'react';
import { Link } from 'react-router-dom';

const LeftSide = props => {
    return (
        <React.Fragment>
            <button type="button" className="btn btn-danger btn-block" onClick={props.toggleComposeModal}>
                Compose
            </button>

            <div className="mail-list mt-4">
                <Link to="/apps/email/inbox" className="list-group-item border-0 text-danger font-weight-bold" onClick={props.showAllEmails}>
                    <i className="uil uil-envelope-alt font-size-15 mr-1"></i>Inbox
                    <span className="badge badge-danger float-right ml-2 mt-1">{props.totalUnreadEmails}</span>
                </Link>
                <Link to="/apps/email/inbox" onClick={props.showStarredEmails} className="list-group-item border-0">
                    <i className="uil uil-envelope-star font-size-15 mr-1"></i>Starred
                </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-envelope-edit font-size-15 mr-1"></i>Draft
                    <span className="badge badge-info float-right ml-2 mt-1">2</span>
                </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-envelope-send font-size-15 mr-1"></i>Sent Mail
                </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-trash font-size-15 mr-1"></i>Trash
                </Link>
            </div>

            <h6 className="mt-4">Labels</h6>
            <div className="list-group b-0 mail-list">
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-circle text-primary font-size-12 mr-1"></i>Web App
                    </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-circle text-info font-size-12 mr-1"></i>Recharges
                    </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-circle text-success font-size-12 mr-1"></i>Wallet Balances
                    </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-circle text-warning font-size-12 mr-1"></i>Friends
                    </Link>
                <Link to="/apps/email/inbox" className="list-group-item border-0">
                    <i className="uil uil-circle text-secondary font-size-12 mr-1"></i>Family
                    </Link>
            </div>
        </React.Fragment>
    );
};

export default LeftSide;