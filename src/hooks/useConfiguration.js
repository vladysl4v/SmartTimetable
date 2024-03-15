import {useLocalStorage} from "./useLocalStorage.js";
import {useMsal} from "@azure/msal-react";
import {useIsMobile} from "./useIsMobile.js";

export const useConfiguration = () => {
    const [localStorage, addToStorage] = useLocalStorage()
    const {instance: msalClient, accounts} = useMsal()
    const isMobile = useIsMobile()
    const isOutagesAllowed = () => localStorage.outageGroup?.value !== '0' && localStorage.outageGroup?.value !== ''
    const isAuthorized = () => accounts[0] != null
    
    return {localStorage, addToStorage, msalClient, account: accounts[0], isMobile, isOutagesAllowed, isAuthorized} 
};