import React from 'react';
import {
    Row, Col, Card, CardBody, UncontrolledTooltip, CustomInput
} from 'reactstrap';
import classNames from 'classnames';


import { allTasks } from './Data';


const TaskSummary = (task) => {
    const clickHandler = task.onClickHandler || {};

    return <React.Fragment>
        <Row className={classNames('justify-content-sm-between', 'border-bottom', 'mt-2', 'pt-2', 'cursor-pointer')} onClick={() => clickHandler(task)}>
            <Col lg={6} className="mb-lg-0">
                <CustomInput type="checkbox" id={`task-${task.id}`} label={task.title} defaultChecked={task.completed}></CustomInput>
            </Col>
            <Col lg={6}>
                <div className="d-sm-flex justify-content-between">
                    <div>
                        <img src={task.assignee_avatar} alt="" className="avatar-xs rounded-circle" id={`task-avt-${task.id}`} />
                        <UncontrolledTooltip placement="bottom" target={`task-avt-${task.id}`}>Assigned to {task.assigned_to}</UncontrolledTooltip>
                    </div>

                    <div className="mt-3 mt-sm-0">
                        <ul className="list-inline font-13 text-sm-right">
                            <li className="list-inline-item pr-1"><i className='uil uil-schedule font-16 mr-1'></i>{task.due_date}</li>
                            <li className="list-inline-item pr-1"><i className='uil uil-align-alt font-16 mr-1'></i>{task.checklists.filter(x => x.completed).length}/{task.checklists.length}</li>
                            <li className="list-inline-item pr-2"><i className='uil uil-comment-message font-16 mr-1'></i>{task.comments.length}</li>
                            <li className="list-inline-item">
                                <span className={classNames('badge', { 'badge-soft-danger': task.priority === 'High', 'badge-soft-info': task.priority === 'Medium', 'badge-soft-success': task.priority === 'Low' }, 'p-1')}>{task.priority}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    </React.Fragment>
}

const Tasks = () => {

    return <React.Fragment>
        <h5 className="mt-3">Tasks</h5>
        <Card className="mb-0 shadow-none">
            <CardBody>
                {allTasks.map((task, index) => {
                    return <TaskSummary {...task} key={index} onClickHandler={() => { }} />
                })}
            </CardBody>
        </Card>
    </React.Fragment>
}


export default Tasks;