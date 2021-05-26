import React from 'react';

const TweetyView = (props) => {
    const {tweety} = props;
    return <div className="card p-1"> {tweety.content} </div>;
    ;
};

export default TweetyView;