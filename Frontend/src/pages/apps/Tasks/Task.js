import React from 'react';
import {
    Row, Col, Card, CardBody, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip,
    UncontrolledDropdown, Media, CustomInput
} from 'reactstrap';
import RichTextEditor from '../../../components/RichTextEditor';


const TaskAttachment = (item) => {
    return <Card className="mb-2 shadow-none border">
        <div className="p-1 px-2">

            <Row className="align-items-center">
                <Col className="col-auto">
                    <div className="avatar-sm font-weight-bold mr-3">
                        <span
                            className="avatar-title rounded bg-soft-primary text-primary">
                            <i className="uil-file-plus-alt font-size-18"></i>
                        </span>
                    </div>
                </Col>
                <Col className="pl-0">
                    <a href="/" className="text-muted font-weight-bold">{item.filename}</a>
                    <p className="mb-0">{item.size}</p>
                </Col>
                <Col className="col-auto">
                    <a href="/" className="btn btn-link text-muted btn-lg p-0" id={`btn-d-${item.id}`}>
                        <i className='uil uil-cloud-download font-size-14'></i>
                    </a>
                    <UncontrolledTooltip placement="bottom" target={`btn-d-${item.id}`}>Download</UncontrolledTooltip>

                    <a href="/" id={`btn-dl-${item.id}`} className="btn btn-link text-danger btn-lg p-0 ml-1">
                        <i className='uil uil-multiply font-size-14'></i>
                    </a>
                    <UncontrolledTooltip placement="bottom" target={`btn-dl-${item.id}`}>Delete</UncontrolledTooltip>
                </Col>
            </Row>
        </div>
    </Card>
}

const TaskComment = (item) => {
    return <Media className="mt-3 p-1">
        <img src={item.author_avatar} className="mr-2 rounded-circle" height="36" alt="" />
        <Media body>
            <h5 className="mt-0 mb-0 font-size-14">
                <span className="float-right text-muted font-size-12">{item.posted_on}</span>
                {item.author}
            </h5>
            <p className="mt-1 mb-0 text-muted">{item.text}</p>
        </Media>
    </Media>
}


const Task = (task) => {
    return <React.Fragment>
        <Card>
            <CardBody>
                <Row className="pb-3 border-bottom">
                    <Col>
                        <UncontrolledDropdown className="float-right">
                            <DropdownToggle tag="button" className="btn btn-link p-0 arrow-none text-muted">
                                <i className='uil uil-ellipsis-h'></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <i className='uil uil-file-upload mr-1'></i>Attachment
                                </DropdownItem>
                                <DropdownItem>
                                    <i className='uil uil-edit mr-1'></i>Edit
                                </DropdownItem>
                                <DropdownItem>
                                    <i className='uil uil-file-copy-alt mr-1'></i>Mark as Duplicate
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem className="text-danger">
                                    <i className='uil uil-trash-alt mr-1'></i>Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <CustomInput type="checkbox" id={`task-${task.id}`} label="Mark as completed" defaultChecked={task.completed}
                            className="float-left"></CustomInput>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4 className="mt-3">{task.title}</h4>

                        <Row>
                            <Col>
                                <p className="mt-2 mb-1 text-muted">Assigned To</p>

                                <Media>
                                    <img src={task.assignee_avatar} alt=""
                                        className="rounded-circle mr-2" height="24" />
                                    <Media body>
                                        <h5 className="mt-1 font-size-14">{task.assigned_to}</h5>
                                    </Media>
                                </Media>
                            </Col>
                            <Col>
                                <p className="mt-2 mb-1 text-muted">Due Date</p>

                                <Media>
                                    <i className='uil uil-schedule font-18 text-success mr-1 align-self-center'></i>
                                    <Media body>
                                        <h5 className="mt-1 font-size-14">{task.due_date}</h5>
                                    </Media>
                                </Media>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <div id="taskDesk">
                                    <RichTextEditor onEditorContentChange={() => { }} hideToolbar={true} initialContent={task.description} />
                                </div>
                            </Col>
                        </Row>

                        <h5 className="mt-4 mb-2 font-size-16">Checklists/Sub-tasks</h5>
                        {task.checklists.map((item, idx) => {
                            return <CustomInput key={idx} type="checkbox" id={`sub-task-${item.id}`} label={item.title}
                                defaultChecked={item.completed} className="mt-1"></CustomInput>
                        })}

                        <h5 className="mt-4 mb-2 font-size-16">Attachments</h5>
                        {task.attachments.map((item, idx) => {
                            return <TaskAttachment {...item} key={idx} />
                        })}

                        <Row className="mt-3">
                            <Col>
                                <h5 className="mb-2 font-size-16">Comments</h5>

                                {task.comments.map((item, idx) => {
                                    return <React.Fragment key={idx}><TaskComment {...item} /><hr /></React.Fragment>;
                                })}
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <div className="border rounded">
                                    <form action="#" className="comment-area-box">
                                        <textarea rows="3" className="form-control border-0 resize-none"
                                            placeholder="Your comment..."></textarea>
                                        <div className="p-2 bg-light">
                                            <div className="float-right">
                                                <button type="submit"
                                                    className="btn btn-sm btn-success"><i
                                                        className='uil uil-message mr-1'></i>Submit</button>
                                            </div>
                                            <div>
                                                <a href="/" className="btn btn-sm px-1 btn-light"><i
                                                    className='uil uil-cloud-upload'></i></a>
                                                <a href="/" className="btn btn-sm px-1 btn-light"><i
                                                    className='uil uil-at'></i></a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </React.Fragment>
}

export default Task;