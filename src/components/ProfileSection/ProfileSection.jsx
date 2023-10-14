import React from 'react';
import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import LoginButton from "../LoginButton/LoginButton.jsx";

import styles from './ProfileSection.module.css'
import microsoftImage from '/media/microsoft-account.svg';
import {MSALScopes} from "../../utilities/MSALConfig.js";
const ProfileSection = () => {
    const { instance, inProgress } = useMsal();
    return (
        <>
            <UnauthenticatedTemplate>
                <div>
                    <img className={styles.accountImage} src={microsoftImage} alt="Microsoft Account"/>
                </div>
                <LoginButton text=" Увійти за допомогою Microsoft" loginStatus={inProgress} onclick={() => authorizePopup(instance)}/>
                <p className="p-2">Увійдіть до свого аккаунту для доступу до персональних функцій</p>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <div style={{marginBottom: "12px"}}>
                    <p>Персональні налаштування розкладу</p>
                    <em className="text-decoration-underline">Ви авторизовані до аккаунту Microsoft</em>
                </div>
                <LoginButton text=" Вийти з аккаунту" loginStatus={inProgress} onclick={() => logoutPopup(instance)}/>
                <hr style={{marginTop: "20px"}}/>
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