import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImageWithDefault = (props) => {
    const {image} = props;
    let imageSource = defaultPicture;
    if(image){
        imageSource = image;
    }
    return <img className='rounded-circle' width="32" height="32" alt={`Profile`} src={imageSource} {... props} />

};

export default ProfileImageWithDefault;