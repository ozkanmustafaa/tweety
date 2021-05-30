import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {getNewTweeties, getNewTweetyCount, getOldTweeties, getTweeties} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import TweetyView from './TweetyView';
import { useParams } from 'react-router';


const TweetyFeed = () => {
    const [tweetyPage, setTweetyPage] = useState({ content: [], last: true, number: 0});
    const [newTweetyCount, setNewTweetyCount] = useState(0);
    const {t} = useTranslation();
    const {username} = useParams();

    const path = username ? `/api/1.0/users/${username}/tweeties/?page=` : '/api/1.0/tweeties/?page=';
    const initialTweetyLoadProgress = useApiProgress('get', path)

    let lastTweetyId = 0;
    let firstTweetyId = 0;
    if(tweetyPage.content.length > 0){
        firstTweetyId = tweetyPage.content[0].id;
        const lastTweetyIndex = tweetyPage.content.length - 1;
        lastTweetyId = tweetyPage.content[lastTweetyIndex].id;
    }

    const oldTweetyPath = username ? `/api/1.0/users/${username}/tweeties/${lastTweetyId}` : `/api/1.0/tweeties/${lastTweetyId}`;
    const loadOldTweetiesProgress = useApiProgress('get', oldTweetyPath, true);

    const newTweetyPath = username ? `/api/1.0/users/${username}/tweeties/${firstTweetyId}?direction=after` : `/api/1.0/tweeties/${firstTweetyId}?direction=after`;

    const loadNewTweetiesProgress = useApiProgress('get', newTweetyPath, true);

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewTweetyCount(firstTweetyId, username);
            setNewTweetyCount(response.data.count);
        };
        let looper = setInterval(getCount, 1000);
        return function cleanup(){
            clearInterval(looper);
        }
    }, [firstTweetyId, username]);

    useEffect(() => {
        const loadTweeties = async (page) => {
            try{
                const response = await getTweeties(username, page);
                setTweetyPage(previousTweetyPage => ({
                    ... response.data,
                    content: [... previousTweetyPage.content, ... response.data.content]
                }));
            } catch(error){}
        };
        loadTweeties();
    }, [username]);

    const loadOldTweeties = async () => {
        const response = await getOldTweeties(lastTweetyId, username);
        setTweetyPage(previousTweetyPage => ({
            ... response.data,
            content: [... previousTweetyPage.content, ... response.data.content]
        }));
    }

    const loadNewTweeties = async () => {
        const response = await getNewTweeties(firstTweetyId, username);
        setTweetyPage(previousTweetyPage => ({
            ... previousTweetyPage,
            content: [... response.data, ... previousTweetyPage.content]
        }));
        setNewTweetyCount(0);
    }

    const {content, last} = tweetyPage;

    if (content.length == 0){
        return <div className="alert alert-secondary text-center">{initialTweetyLoadProgress ? <Spinner /> : t('There are no tweeties')}</div>
    }

    return (
        <div>
            {newTweetyCount > 0 && (
            <div 
                className="alert alert-secondary text-center mb-1"
                style={{cursor: loadNewTweetiesProgress ? 'not-allowed' : 'pointer'}} 
                onClick={loadNewTweetiesProgress ? () => {} : loadNewTweeties}>
                {loadNewTweetiesProgress ? <Spinner /> : t('There are new tweeties')}
            </div>)}
            {content.map(tweety => {
                return <TweetyView key={tweety.id} tweety={tweety} />
            })}
            {!last && (
                <div 
                    className="alert alert-secondary text-center" 
                    style={{cursor: loadOldTweetiesProgress ? 'not-allowed' : 'pointer'}} 
                    onClick={loadOldTweetiesProgress ? () => {} : loadOldTweeties}>
                    {loadOldTweetiesProgress ? <Spinner /> : t('Load old tweeties')}
                </div>
                )}
        </div>
    );
};

export default TweetyFeed;