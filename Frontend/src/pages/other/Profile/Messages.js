import React from 'react';
import { Media } from 'reactstrap';
import { Loader } from 'react-feather';

import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar5 from '../../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../../assets/images/users/avatar-8.jpg';


const Message = (item) => {
    return <Media>
        <div className="mr-3">
            <img src={item.avatar} alt="" className="avatar-md rounded-circle" />
        </div>
        <Media body className="overflow-hidden">
            <h5 className="font-size-15 mt-2 mb-1"><a href="/" className="text-dark">{item.from}</a></h5>
            <p className="text-muted font-size-13 text-truncate mb-0">{item.message}</p>
        </Media>
    </Media>
}

const Messages = () => {
    const messages = [
        { id: 1, from: 'John Jack', avatar: avatar1, message: 'The languages only differ in their grammar' },
        { id: 2, from: 'Theodore', avatar: avatar2, message: 'Everyone realizes why a new common language' },
        { id: 3, from: 'Michael', avatar: avatar3, message: 'To an English person, it will seem like simplified' },
        { id: 4, from: 'Tony Lindsey', avatar: avatar4, message: 'If several languages coalesce the grammar' },
        { id: 5, from: 'Robert Wilke', avatar: avatar5, message: 'Their separate existence is a myth' },
        { id: 6, from: 'James', avatar: avatar6, message: 'The European languages are members' },
        { id: 7, from: 'Brian', avatar: avatar7, message: 'At vero eos et accusamus et iusto odio' },
        { id: 8, from: 'Aeron Nickel', avatar: avatar8, message: 'Itaque earum rerum hic tenetur a sapiente' },
    ];

    return (
        <React.Fragment>
            <h5 className="mt-3">Messages</h5>
            <ul className="list-unstyled">
                {messages.map((item, idx) => {
                    return <li className="py-3 border-bottom" key={idx}>
                        <Message {...item} />
                    </li>
                })}
            </ul>

            <div className="text-center">
                <a href="/" className="btn btn-white btn-sm"><Loader className="mr-2 icon-xs"></Loader>Load more</a>
            </div>

        </React.Fragment>
    );
};

export default Messages;
