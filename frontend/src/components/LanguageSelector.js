import React from 'react';
import {withTranslation} from 'react-i18next';
import {changeLanguage} from '../api/apiCalls';

const LanguageSelector = (props) => {
    const onChangeLanguage = language => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
    <div className="container">
        <img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/TR.svg" height="50px" width="50px" alt="Turkish Flag" onClick={() => onChangeLanguage('tr')} style={{cursor: 'pointer'}}></img>
        <img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" height="50px" width="50px" alt="USA Flag" onClick={() => onChangeLanguage('en')} style={{cursor: 'pointer'}}></img>
    </div>
    );
};

export default withTranslation()(LanguageSelector);