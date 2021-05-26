import React from 'react';
import { useSelector } from 'react-redux';
import TweetyFeed from '../components/TweetyFeed';
import TweetySubmit from '../components/TweetySubmit';
import UserList from '../components/UserList';

const HomePage = () => {
    const {isLoggedIn} = useSelector(store => ({isLoggedIn: store.isLoggedIn}))
    return (
        <div className="container">
            <div className="row">
                <div className="col"> 
                    {isLoggedIn && 
                    <div className="mb-1">
                        <TweetySubmit />
                    </div>
                    }
                    <TweetyFeed />
                </div>
                <div className="col"> <UserList /> </div>
            </div>
        </div>
    );
};

export default HomePage;