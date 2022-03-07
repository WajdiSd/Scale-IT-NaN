import React from 'react';
import { Card, CardBody, Button, UncontrolledPopover, PopoverBody } from 'reactstrap';


const Popovers = () => {
    const placements = [
        {
            placement: 'top',
            text: 'Top',
            trigger: 'click',
            color: 'primary',
        },
        {
            placement: 'bottom',
            text: 'Bottom',
            trigger: 'click',
            color: 'primary',
        },
        {
            placement: 'left',
            text: 'Left',
            trigger: 'click',
            color: 'primary',
        },
        {
            placement: 'right',
            text: 'Right',
            trigger: 'click',
            color: 'primary',
        },
        {
            placement: 'right',
            text: 'Dismissible',
            trigger: 'focus',
            color: 'success',
        },
    ];

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h5 className="header-title mb-1 mt-0">Popovers</h5>
                    <p className="sub-header">Add small overlays of content, like those on the iPad, to any element for housing secondary information.</p>

                    <div className="button-list">
                        {placements.map((popover, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Button className="mr-1" color={popover.color} type="button" id={'btn-' + i}>
                                        {popover.text}
                                    </Button>
                                    <UncontrolledPopover
                                        placement={popover.placement}
                                        id={i}
                                        target={'btn-' + i}
                                        trigger={popover.trigger}>
                                        <PopoverBody>
                                            Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare
                                            sem lacinia quam venenatis vestibulum.
                                    </PopoverBody>
                                    </UncontrolledPopover>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Popovers;
