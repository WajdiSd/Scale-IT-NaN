import React from 'react';


const Activity = (item) => {
    return <div className="pb-4">
        <div className="media">
            <div className="event-date text-center mr-4">
                <div className="bg-soft-primary p-1 rounded text-primary font-size-14">{item.date}</div>
            </div>
            <div className="media-body">
                <h6 className="font-size-15 mt-0 mb-1">{item.title}</h6>
                <p className="text-muted font-size-14">{item.description}</p>
            </div>
        </div>
    </div>
}

const Activities = () => {
    const activities = [
        { id: 1, title: 'Designing Shreyu Admin', description: 'Shreyu Admin - A responsive admin and dashboard template', date: '02 hours ago' },
        { id: 2, title: 'UX and UI for Ubold Admin', description: 'Ubold Admin - A responsive admin and dashboard template', date: '21 hours ago' },
        { id: 3, title: 'UX and UI for Hyper Admin', description: 'Hyper Admin - A responsive admin and dashboard template', date: '22 hours ago' },
    ]

    return (
        <React.Fragment>
            <h5 className="mt-3">This Week</h5>
            <div className="left-timeline mt-3 mb-3 pl-4">
                <ul className="list-unstyled events mb-0">
                    {activities.map((item, idx) => {
                        return <li className="event-list" key={idx}>
                            <Activity {...item} />
                        </li>
                    })}
                </ul>
            </div>

            <h5 className="mt-3">Last Week</h5>
            <div className="left-timeline mt-3 mb-3 pl-4">
                <ul className="list-unstyled events mb-0">
                    {activities.map((item, idx) => {
                        return <li className="event-list" key={idx}>
                            <Activity {...item} />
                        </li>
                    })}
                </ul>
            </div>

            <h5 className="mt-3">Last Month</h5>
            <div className="left-timeline mt-3 mb-3 pl-4">
                <ul className="list-unstyled events mb-0">
                    {activities.map((item, idx) => {
                        return <li className="event-list" key={idx}>
                            <Activity {...item} />
                        </li>
                    })}
                </ul>
            </div>

        </React.Fragment>
    );
};

export default Activities;
