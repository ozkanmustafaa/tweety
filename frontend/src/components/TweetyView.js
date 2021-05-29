import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import { useTranslation } from 'react-i18next';

const TweetyView = (props) => {
    const {tweety} = props;
    const {user, content, timestamp} = tweety;
    const {username, displayName, image} = user;

    const {i18n} = useTranslation()

    const formatted = format(timestamp, i18n.language);

    return <div className="card p-1"> 
        <div className="d-flex ">
            <ProfileImageWithDefault image={image} className="rounded-circle m-1" width="32" height="32" />
            <div className="flex-fill m-auto pl-2">
                <Link to={`/user/${username}`} className="text-dark">
                    <h6 className="d-inline">
                        {displayName}@{username}
                    </h6>
                    <span> - </span>
                    <span> {formatted} </span>
                </Link>
            </div>
        </div>
        <div className="pl-5">
            {content} 
        </div>
    </div>;
    ;
};

export default TweetyView;