import React from 'react';
import {Link} from "react-router-dom";
import CardHeader from "../components/public/CardHeader";

import ProfileSection from "../components/settings/ProfileSection";
import StudyGroupSection from "../components/settings/StudyGroupSection";
import OutageGroupSection from "../components/settings/OutageGroupSection";

const Settings = () => {
    return (
        <div className="row justify-content-center sections mb-1 gap-3">
            <CardHeader text="Налаштування" isLoading={false}>
                <Link style={{height: 'fit-content'}} to="/"><i style={{color: '#000000'}} className="fa-solid fa-circle-chevron-left fa-2x"></i></Link>
            </CardHeader>
            <div className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                <StudyGroupSection />
                <hr/>
                <OutageGroupSection />
            </div>
            <div className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                <ProfileSection />
            </div>
        </div>
    );
};

export default Settings;