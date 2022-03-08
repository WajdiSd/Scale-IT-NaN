import React from 'react';
import classNames from 'classnames';


/**
 * TaskList
 */
const TaskList = (props) => {
    const children = props.children || null;
    const Tag = props.tag;

    return (
        <Tag className={classNames(props.className)} {...props}>
            {children}
        </Tag>
    );
};

TaskList.defaultProps = {
    tag: 'div',
};

export default TaskList;
