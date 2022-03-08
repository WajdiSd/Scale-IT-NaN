// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import PageTitle from '../../components/PageTitle';
import calImg from '../../assets/images/cal.png';


const CalendarApp = () => {
    const events = [
        {
            id: 1,
            title: 'Meeting with Mr. Shreyu!',
            start: new Date().setDate(new Date().getDate() + 1),
            end: new Date().setDate(new Date().getDate() + 2),
            className: 'bg-warning text-white',
        },
        {
            id: 2,
            title: 'See John Deo',
            start: new Date(),
            end: new Date(),
            className: 'bg-success text-white',
        },
        {
            id: 3,
            title: 'Meet John Deo',
            start: new Date().setDate(new Date().getDate() + 8),
            className: 'bg-info text-white',
        },
        {
            id: 4,
            title: 'Buy a Theme',
            start: new Date().setDate(new Date().getDate() + 7),
            className: 'bg-primary text-white',
        },
    ];

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Apps', path: '/apps/calendar' },
                            { label: 'Calendar', path: '/apps/calendar', active: true },
                        ]}
                        title={'Calendar'}
                    />
                </Col>
            </Row>

            <Row className="align-items-center">
                <Col>
                    <Card>
                        <CardBody>
                            <Row className="align-items-center">
                                <Col xl={2} lg={3}>
                                    <img src={calImg} className="mr-4 align-self-center img-fluid" alt="cal" />
                                </Col>
                                <Col xl={10} lg={9}>
                                    <div className="mt-4 mt-lg-0">
                                        <h5 className="mt-0 mb-1 font-weight-bold">Welcome to Your Calendar</h5>
                                        <p className="text-muted mb-2">The calendar shows the events synced from all
                                            your linked calendars.
                                            Click on event to see or edit the details. You can create new event by
                                            clicking on "Create New event" button or any cell available
                                                    in calendar below.</p>

                                        <Button color="primary" className="mt-2 mr-2"><i className="uil-plus-circle"></i> Create New Event</Button>
                                        <Button color="white" className="mt-2"><i className="uil-sync"></i> Link Calendars</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            {/* fullcalendar control */}
                            <FullCalendar
                                defaultView="dayGridMonth"
                                plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                                slotDuration='00:15:00'
                                minTime='08:00:00' maxTime='19:00:00' themeSystem='bootstrap'
                                handleWindowResize={true}
                                bootstrapFontAwesome={false}
                                buttonText={{today: 'Today', month: 'Month', week: 'Week', day: 'Day', list: 'List', prev: 'Prev', next: 'Next' }}
                                header={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                                }}
                                droppable={true}
                                editable={true}
                                eventLimit={true} // allow "more" link when too many events
                                selectable={true}
                                events={events}
                                id="calendar"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CalendarApp;
