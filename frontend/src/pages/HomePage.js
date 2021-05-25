import React from 'react';
import { useSelector } from 'react-redux';
import TweetySubmit from '../components/TweetySubmit';
import UserList from '../components/UserList';

const HomePage = () => {
    const {isLoggedIn} = useSelector(store => ({isLoggedIn: store.isLoggedIn}))
    return (
        <div className="container">
            <div className="row">
                <div className="col"> {isLoggedIn && <TweetySubmit />} </div>
                <div className="col"> <UserList /> </div>
            </div>
        </div>
    );
};

export default HomePage;