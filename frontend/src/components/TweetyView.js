import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteTweety } from '../api/apiCalls';
import Modal from './Modal';
import {useApiProgress} from '../shared/ApiProgress';

const TweetyView = (props) => {
    const loggedInUser = useSelector(store => store.username)
    const {tweety, onDeleteTweety} = props;
    const {user, content, timestamp, fileAttachment, id} = tweety;
    const {username, displayName, image} = user;
    const [modalVisible, setModalVisible] = useState(false);

    const pendingApiCall = useApiProgress('delete', `/api/1.0/tweeties/${id}`, true);

    const {t, i18n} = useTranslation();

    const onClickDelete = async () => {
        await deleteTweety(id);
        onDeleteTweety(id);
    };

    const onClickCancel = () => {
        setModalVisible(false);
    }

    const formatted = format(timestamp, i18n.language);

    const ownedByLoggedInUser = loggedInUser == username;

    return(
    <>
        <div className="card p-1"> 
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
                {ownedByLoggedInUser && <button className="btn btn-delete-link btn-sm" onClick={() => setModalVisible(true)}>
                    <span class="material-icons">delete_outline</span>
                </button>}
            </div>
            <div className="pl-5">{content}</div>
            {fileAttachment && (
                <div className="pl-5">
                    {fileAttachment.fileType.startsWith('image') && (
                    <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
                    )}
                    {!fileAttachment.fileType.startsWith('image') && (
                        <strong>Tweety has unknown attachment</strong>
                    )}
                </div>
            )}
        </div>
    <Modal 
        visible={modalVisible} 
        title={t('Delete Tweety')} 
        okButton={t('Delete Tweety')}
        onClickCancel={onClickCancel} 
        onClickOk={onClickDelete} 
        pendingApiCall={pendingApiCall}
            message={
                <div>
                    <div>
                        <strong>{t('Are you sure to delete tweety?')}</strong>
                    </div>
                    <span>{content}</span>
                </div>
            }
    />
    </>
    );
};

export default TweetyView;