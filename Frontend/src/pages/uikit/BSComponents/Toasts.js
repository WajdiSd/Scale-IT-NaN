import React from 'react';
import { Card, CardBody, Toast, ToastBody, ToastHeader } from 'reactstrap';

import logo from '../../../assets/images/logo.png';

const Toasts = () => {
    const messages = [
        { id: 1, title: 'Shreyu', date: '15 mins ago', message: 'Hello, world! This is a toast message.' },
        { id: 2, title: 'Shreyu', date: '14 mins ago', message: 'Hello, world! This is a toast message.' },
        { id: 3, title: 'Shreyu', date: '12 mins ago', message: 'Hello, world! This is a toast message.' },
        { id: 4, title: 'Shreyu', date: '11 mins ago', message: 'Hello, world! This is a toast message.' }
    ];

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h5 className="header-title mb-1 mt-0">Toast</h5>
                    <p className="sub-header">
                        Push notifications to your visitors with a toast, a lightweight and easily customizable alert message
                    </p>

                    <div className="pt-5 px-3">
                        {messages.map((message, index) => {
                            return (
                                <Toast key={index}>
                                    <ToastHeader>
                                        <img src={logo} alt="brand-logo" height="16" className="mr-2" />
                                        <strong className="mr-auto">{message.title}</strong>
                                        <small>{message.date}</small>
                                    </ToastHeader>
                                    <ToastBody>{message.message}</ToastBody>
                                </Toast>
                            );
                        })}
                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Toasts;
