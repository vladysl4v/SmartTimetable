import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import microsoftImage from '../../assets/microsoft-account.svg';
import {MSALScopes} from "../../utils/MSALConfig.js";
import './ProfileSection.css';
const ProfileSection = ({instance, inProgress}) => {
    return (
        <>
            <UnauthenticatedTemplate>
                <div>
                    <img className="img-microsoft" src={microsoftImage} alt="Microsoft Account"/>
                </div>
                <button className="btn btn-outline-primary" onClick={() => authorizePopup(instance)}>
                    {(inProgress === "login" || inProgress === "logout")
                        ? <><i className="fa-solid fa-spinner fa-spin fa-xl clr-microsoft"></i> Вхід...</>
                        : <><i className="fa-brands fa-microsoft fa-xl clr-microsoft"></i>{" Увійти за допомогою Microsoft"}</>
                    }
                </button>
                <p className="p-2">Увійдіть до свого аккаунту для доступу до персональних функцій</p>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <div style={{marginBottom: "12px"}}>
                    <p>Персональні налаштування розкладу</p>
                    <em className="text-decoration-underline">Ви авторизовані до аккаунту Microsoft</em>
                </div>
                <button className="btn btn-outline-primary" onClick={() => logoutPopup(instance)}>
                    {(inProgress === "login" || inProgress === "logout")
                        ? <><i className="fa-solid fa-spinner fa-spin fa-xl clr-microsoft"></i> Вхід...</>
                        : <><i className="fa-brands fa-microsoft fa-xl clr-microsoft"></i>{" Вийти з аккаунту"}</>
                    }
                </button> 
            </AuthenticatedTemplate>
        </>
    );
};

const authorizePopup = async (instance) => {
    try {
        await instance.loginPopup(MSALScopes)
    } catch (error) {
        console.error(error)
    }
}

const logoutPopup = async (instance) => {
    try {
        await instance.logoutPopup()
    } catch (error) {
        console.error(error)
    }
}

export default ProfileSection;