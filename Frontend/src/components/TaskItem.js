import React from 'react';
import classNames from 'classnames';

/**
 * TaskItem
 */
const TaskItem = (props) => {

    return (
        <div className={classNames('custom-control', 'custom-checkbox', props.className)}>
            <input type="checkbox" className="custom-control-input" id={`task-${props.id}`} />
            <label className="custom-control-label" htmlFor={`task-${props.id}`}>
                {props.title}
            </label>
            <p className="font-size-13 text-muted">Due on {props.due_date}</p>
        </div>
    );
};

export default TaskItem;
