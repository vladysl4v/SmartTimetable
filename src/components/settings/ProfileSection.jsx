import React from 'react';
import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import LoginButton from "./ui/LoginButton";
import {MSALScopes} from "../../utilities/MSALConfig";
import RequestService from "../../utilities/RequestService";

import microsoftImage from '/media/microsoft-account.svg';
const ProfileSection = () => {
    const authorizePopup = async () => {
        try {
            const response = await instance.loginPopup(MSALScopes)
            await RequestService.addNote(response.accessToken)
        } catch (error) {
            console.error(error)
        }
    }

    const logoutPopup = async () => {
        try {
            await instance.logoutPopup()
        } catch (error) {
            console.error(error)
        }
    }
    const { instance, inProgress } = useMsal();

    return (
        <>
            <UnauthenticatedTemplate>
                <div>
                    <img style={{height:'100px', margin: '10px'}} src={microsoftImage} alt="Microsoft Account"/>
                </div>
                <LoginButton text=" Увійти за допомогою Microsoft" loginStatus={inProgress} onclick={authorizePopup}/>
                <p className="p-2">Увійдіть до свого аккаунту для доступу до персональних функцій</p>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <div style={{marginBottom: "12px"}}>
                    <p>Персональні налаштування розкладу</p>
                    <em className="text-decoration-underline">Ви авторизовані до аккаунту Microsoft</em>
                </div>
                <LoginButton text=" Вийти з аккаунту" loginStatus={inProgress} onclick={logoutPopup}/>
                <hr style={{marginTop: "20px"}}/>
            </AuthenticatedTemplate>
        </>
    );
};

export default ProfileSection;