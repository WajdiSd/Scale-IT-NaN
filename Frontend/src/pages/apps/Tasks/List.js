import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Row, Col, Card, CardBody, Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip,
    UncontrolledButtonDropdown, Collapse, CustomInput
} from 'reactstrap';
import classNames from 'classnames';
import { Loader } from 'react-feather';

import PageTitle from '../../../components/PageTitle';

import Task from './Task';
import { todayTasks, upcomingTasks, otherTasks } from './Data';


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

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.togglePanel = this.togglePanel.bind(this);
        this.selectTask = this.selectTask.bind(this);
        this.state = { todayTaskCollapse: true, upcomingTaskCollapse: true, otherTaskCollapse: true, selectedTask: todayTasks[0] };
    }

    /**
     * Toggle panel
     */
    togglePanel(panel) {
        var state = { ...this.state };
        state[panel] = !state[panel];
        this.setState(state);
    }

    /**
     * Selects the task
     * @param {*} task 
     */
    selectTask(task) {
        this.setState({ selectedTask: task });
    }

    render() {
        return <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Apps', path: '/apps/tasks/list' },
                            { label: 'Tasks', path: '/apps/tasks/list', active: true },
                        ]}
                        title={'Tasks List'}
                    />
                </Col>
            </Row>

            {/* filter panel */}
            <Row>
                <Col xl={8}>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm={3}>
                                            <Button color="primary"><i className='uil uil-plus mr-1'></i>Add New</Button>
                                        </Col>

                                        <Col sm={9}>
                                            <div className="float-sm-right mt-3 mt-sm-0">
                                                <div className="task-search d-inline-block mb-3 mb-sm-0 mr-sm-3">
                                                    <form>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control search-input"
                                                                placeholder="Search..." />
                                                            <span className="uil uil-search icon-search"></span>
                                                            <div className="input-group-append">
                                                                <button className="btn btn-soft-primary" type="button">
                                                                    <i className='uil uil-file-search-alt'></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <UncontrolledButtonDropdown className="d-inline-block">
                                                    <DropdownToggle tag="button" className="btn btn-secondary dropdown-toggle">
                                                        <i className='uil uil-sort-amount-down'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem>Due Date</DropdownItem>
                                                        <DropdownItem>Added Date</DropdownItem>
                                                        <DropdownItem>Assignee</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col>
                                            <Link to="#" id="todayTasks" className="p-0 text-dark" onClick={() => { this.togglePanel('todayTaskCollapse') }}>
                                                <h5 className="mb-0">
                                                    {this.state.todayTaskCollapse && <i className='uil uil-angle-down font-size-18 align-middle'></i>}
                                                    {!this.state.todayTaskCollapse && <i className='uil uil-angle-right font-size-18 align-middle'></i>}

                                                    Today <span className="text-muted font-size-14">({todayTasks.length})</span></h5>
                                            </Link>
                                            <Collapse isOpen={this.state.todayTaskCollapse}>
                                                <Card className="mb-0 shadow-none">
                                                    <CardBody>
                                                        {todayTasks.map((task, index) => {
                                                            return <TaskSummary {...task} key={index} onClickHandler={this.selectTask} />
                                                        })}
                                                    </CardBody>
                                                </Card>
                                            </Collapse>

                                            <div className="mt-4">
                                                <Link to="#" id="upcomingTasks" className="p-0 text-dark" onClick={() => { this.togglePanel('upcomingTaskCollapse') }}>
                                                    <h5 className="mb-0">
                                                        {this.state.upcomingTaskCollapse && <i className='uil uil-angle-down font-size-18 align-middle'></i>}
                                                        {!this.state.upcomingTaskCollapse && <i className='uil uil-angle-right font-size-18 align-middle'></i>}

                                                        Upcoming <span className="text-muted font-size-14">({upcomingTasks.length})</span></h5>
                                                </Link>
                                                <Collapse isOpen={this.state.upcomingTaskCollapse}>
                                                    <Card className="mb-0 shadow-none">
                                                        <CardBody>
                                                            {upcomingTasks.map((task, index) => {
                                                                return <TaskSummary {...task} key={index} />
                                                            })}
                                                        </CardBody>
                                                    </Card>
                                                </Collapse>
                                            </div>

                                            <div className="mt-4">
                                                <Link to="#" id="otherTasks" className="p-0 text-dark" onClick={() => { this.togglePanel('otherTaskCollapse') }}>
                                                    <h5 className="mb-0">
                                                        {this.state.otherTaskCollapse && <i className='uil uil-angle-down font-size-18 align-middle'></i>}
                                                        {!this.state.otherTaskCollapse && <i className='uil uil-angle-right font-size-18 align-middle'></i>}

                                                        Other <span className="text-muted font-size-14">({otherTasks.length})</span></h5>
                                                </Link>
                                                <Collapse isOpen={this.state.otherTaskCollapse}>
                                                    <Card className="mb-0 shadow-none">
                                                        <CardBody>
                                                            {otherTasks.map((task, index) => {
                                                                return <TaskSummary {...task} key={index} />
                                                            })}
                                                        </CardBody>
                                                    </Card>
                                                </Collapse>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 mt-5">
                                        <Col>
                                            <div className="text-center">
                                                <a href="/" className="btn btn-white mb-3">
                                                    <Loader className="icon-dual icon-xs mr-2"></Loader>
                                                    Load more</a>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xl={4}>
                    <Task {...this.state.selectedTask} />
                </Col>
            </Row>
        </React.Fragment>
    }
}


export default TaskList;