import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImageWithDefault = (props) => {
    const {image, tempimage} = props;
    let imageSource = defaultPicture;
    if(image){
        imageSource = 'images/' + image;
    }
    return <img className='rounded-circle' 
    width="32" height="32" 
    alt={`Profile`} src={tempimage || imageSource} {... props}
    onError={(event) => {
        event.target.src = defaultPicture
    }}
    />

};

export default ProfileImageWithDefault;