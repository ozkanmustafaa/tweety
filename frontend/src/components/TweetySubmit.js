import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {postTweety, postTweetyAttachment} from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';

const TweetySubmit = () => {
    const {image} = useSelector(store => ({image: store.image}));
    const [focused, setFocused] = useState(false);
    const [tweety, setTweety] = useState('');
    const [errors, setErrors] = useState({});
    const [newImage, setNewImage] = useState();
    const [attachmentId, setAttachmentId] = useState();
    const {t} = useTranslation();

    useEffect(() => {
        if(!focused){
            setTweety('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [tweety]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/tweeties', true);
    const pendingFileUpload = useApiProgress('post', '/api/1.0/tweety-attachments', true);

    const onClickTweety = async () => {
        const body = {
            content: tweety,
            attachmentId: attachmentId
        }
        try{
            await postTweety(body);
            setFocused(false);
        } catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    const onChangeFile = (event) => {
        if( event.target.files.length < 1 ) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        const response = await postTweetyAttachment(attachment);
        setAttachmentId(response.data.id);
    }

    let textAreaClass = 'form-control';
    if(errors.content){
        textAreaClass += ' is-invalid';
    }

    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault image={image} className="rounded-circle mr-1" />
            <div className="flex-fill">
                <textarea className={textAreaClass} 
                rows={focused ? "3" : "1"} 
                onFocus={() => {setFocused(true)}}
                onChange={event => setTweety(event.target.value)}
                value={tweety} />
                <div className="invalid-feedback">{errors.content}</div>
                {focused && (
                    <>
                        {!newImage && (<Input type="file" onChange={onChangeFile}/>)}
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload}/>}
                        <div className="text-right mt-1">
                        <ButtonWithProgress 
                        className="btn btn-primary" 
                        onClick={onClickTweety} 
                        text="Tweety"
                        pendingApiCall={pendingApiCall}
                        disabled={pendingApiCall || pendingFileUpload}
                        />
                        <button 
                                className="btn btn-light d-inline-flex ml-1" 
                                onClick={() => setFocused(false)}
                                disabled={pendingApiCall || pendingFileUpload}>
                                <span className="material-icons">close</span>
                                {t('Cancel')}
                        </button>
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default TweetySubmit;