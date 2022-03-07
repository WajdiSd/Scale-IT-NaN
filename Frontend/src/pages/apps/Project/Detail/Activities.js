import React from 'react';
import { Media } from 'reactstrap';
import classNames from 'classnames';
import { Loader } from 'react-feather';

const Activity = (props) => {
    return <Media>
        <div className="text-center mr-3">
            <div className="avatar-sm">
                <span className={classNames('avatar-title', 'rounded-circle', props.classNames)}>{props.day}</span>
            </div>
            <p className="text-muted font-size-13 mb-0">{props.month}</p>
        </div>
        <div className="media-body overflow-hidden">
            <h5 className="font-size-15 mt-2 mb-1"><a href="/" className="text-dark">{props.user}</a></h5>
            <p className="text-muted font-size-13 text-truncate mb-0">{props.description}</p>
        </div>
    </Media>
}


const Activities = () => {

    return (
        <React.Fragment>
            <h6 className="mt-0 header-title">Project Activities</h6>

            <ul className="list-unstyled activity-widget">
                <li className="activity-list">
                    <Activity day="09" month="Jan" user="Bryan" description="Neque porro quisquam est" classNames="bg-soft-primary text-primary" />
                </li>
                <li className="activity-list">
                    <Activity day="08" month="Jan" user="Everett" description="Ut enim ad minima veniam quis velit" classNames="bg-soft-success text-success" />
                </li>
                <li className="activity-list">
                    <Activity day="08" month="Jan" user="Richard" description="Quis autem vel eum iure" classNames="bg-soft-warning text-warning" />
                </li>
                <li className="activity-list">
                    <Activity day="08" month="Jan" user="Jerry" description="Quis autem vel eum iure" classNames="bg-soft-info text-info" />
                </li>
                <li className="activity-list">
                    <Activity day="07" month="Jan" user="Bryan" description="Neque porro quisquam est" classNames="bg-soft-primary text-primary" />
                </li>
                <li className="activity-list">
                    <Activity day="07" month="Jan" user="Everett" description="Ut enim ad minima veniam quis velit" classNames="bg-soft-success text-success" />
                </li>
                <li className="activity-list">
                    <Activity day="06" month="Jan" user="Richard" description="Quis autem vel eum iure" classNames="bg-soft-warning text-warning" />
                </li>
                <li className="activity-list">
                    <Activity day="05" month="Jan" user="Jerry" description="Quis autem vel eum iure" classNames="bg-soft-info text-info" />
                </li>
            </ul>

            <div className="text-center">
                <a href="/" className="btn btn-sm border btn-white">
                    <Loader className="icon-dual icon-xs mr-2"></Loader>
                    Load more</a>
            </div>
        </React.Fragment>
    );
};

export default Activities;
