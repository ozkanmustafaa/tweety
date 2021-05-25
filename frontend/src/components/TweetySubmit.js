import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {postTweety} from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const TweetySubmit = () => {
    const {image} = useSelector(store => ({image: store.image}));
    const [focused, setFocused] = useState(false);
    const [tweety, setTweety] = useState('');
    const[errors, setErrors] = useState({});
    const {t} = useTranslation();

    useEffect(() => {
        if(!focused){
            setTweety('');
            setErrors({});
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [tweety]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/tweeties');

    const onClickTweety = async () => {
        const body = {
            content: tweety
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
                {focused && (<div className="text-right mt-1">
                    <ButtonWithProgress 
                    className="btn btn-primary" 
                    onClick={onClickTweety} 
                    text="Tweety"
                    pendingApiCall={pendingApiCall}
                    disabled={pendingApiCall}
                     />
                    <button 
                            className="btn btn-light d-inline-flex ml-1" 
                            onClick={() => setFocused(false)}
                            disabled={pendingApiCall}>
                            <span className="material-icons">close</span>
                            {t('Cancel')}
                    </button>
                </div>)}
            </div>
        </div>
    );
};

export default TweetySubmit;