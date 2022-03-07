import React from 'react';
import { Card, CardBody, Button, UncontrolledTooltip } from 'reactstrap';


const Tooltips = () => {
    const placements = [
        {
            placement: 'top',
            text: 'Top',
        },
        {
            placement: 'bottom',
            text: 'Bottom',
        },
        {
            placement: 'left',
            text: 'Left',
        },
        {
            placement: 'right',
            text: 'Right',
        },
    ];

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h5 className="header-title mb-1 mt-0">Tooltips</h5>
                    <p className="sub-header">Four options are available: top, right, bottom, and left aligned</p>

                    <div className="button-list">
                        {placements.map((tooltip, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Button className="mr-1" color="primary" type="button" id={'tbtn-' + i}>
                                        {tooltip.text}
                                    </Button>
                                    <UncontrolledTooltip
                                        placement={tooltip.placement}
                                        id={'tooltip-' + i}
                                        target={'tbtn-' + i}>
                                        Tooltip Content!
                                </UncontrolledTooltip>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Tooltips;
