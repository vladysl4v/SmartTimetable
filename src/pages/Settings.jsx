import React from 'react';
import ProfileSection from "../components/ProfileSection/ProfileSection.jsx";
import StudyGroupSection from "../components/StudyGroupSection/StudyGroupSection.jsx";
import OutageGroupSection from "../components/OutageGroupSection/OutageGroupSection.jsx";
import Title from "../components/Title/Title.jsx";

const Settings = () => {
    return (
        <div className="row justify-content-center sections mb-1 gap-3">
            <Title navigation="/" iconStyles="fa-solid fa-circle-chevron-left" loading={false}>Налаштування</Title>
            <section className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                <StudyGroupSection />
                <hr/>
                <OutageGroupSection />
            </section>
            <section className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                <ProfileSection />
            </section>
        </div>
    );
};

export default Settings;