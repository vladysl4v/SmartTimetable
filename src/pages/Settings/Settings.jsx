import {OutageGroupSection} from "../../components/OutageGroupSection/OutageGroupSection.jsx";
import ProfileSection from "../../components/ProfileSection/ProfileSection.jsx";
import {MainContainer} from "../../layout/MainContainer/MainContainer.jsx";
import {useMsal} from "@azure/msal-react";
import {useLocalStorage} from "../../hooks/useLocalStorage.js";
import {TeacherFiltersSection} from "../../components/TeacherFiltersSection/TeacherFiltersSection.jsx";
import {StudentFiltersSection} from "../../components/StudentFiltersSection/StudentFiltersSection.jsx";

export const Settings = () => {
    const { instance, inProgress } = useMsal();
    const [localStorage, addToLocalStorage]  = useLocalStorage();
    return (
        <MainContainer classList="row justify-content-center sections mb-1 gap-3 text-light">
            <h3 className="text-center">Налаштування</h3>
            <section className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                <StudentFiltersSection defaultValues={localStorage} setValue={addToLocalStorage} />
                <hr className='mt-4'/>
                <TeacherFiltersSection defaultValues={localStorage} setValue={addToLocalStorage} />
                <hr className='mt-4'/>
            </section>
            <section className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                <OutageGroupSection defaultValues={localStorage} setValue={addToLocalStorage} />
                <hr className='mt-5 mb-5'/>
                <ProfileSection inProgress={inProgress} instance={instance} />
            </section>
        </MainContainer>
    )
}