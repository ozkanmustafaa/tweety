import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {getTweeties} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import TweetyView from './TweetyView';

const TweetyFeed = () => {
    const [tweetyPage, setTweetyPage] = useState({ content: [], last: true, number: 0});
    const {t} = useTranslation();
    const pendingApiCall = useApiProgress('get', '/api/1.0/tweeties')

    useEffect(() => {
        loadTweeties();
    }, []);

    
    const loadTweeties = async (page) => {
        try{
            const response = await getTweeties(page);
            setTweetyPage(previousTweetyPage => ({
                ... response.data,
                content: [... previousTweetyPage.content, ... response.data.content]
            }));
        } catch(error){

        }
    };

    const {content, last, number} = tweetyPage;

    if (content.length == 0){
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : t('There are no tweeties')}</div>
    }


    return (
        <div>
            {content.map(tweety => {
                return <TweetyView key={tweety.id} tweety={tweety} />
            })}
            {!last && (
                <div 
                    className="alert alert-secondary text-center" 
                    style={{cursor: pendingApiCall ? 'not-allowed' : 'pointer'}} 
                    onClick={pendingApiCall ? () => {} : () => loadTweeties(number + 1)}>
                    {pendingApiCall ? <Spinner /> : t('Load old tweeties')}
                </div>
                )}
        </div>
    );
};

export default TweetyFeed;