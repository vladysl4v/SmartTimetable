import {useState} from "react";

export function useLocalStorage() {
    const [localStorage, setLocalStorage] = useState(JSON.parse(window.localStorage.getItem('preferences') ?? '{}'))
    const addToLocalStorage = (key, value) => {
        if (localStorage[key] === value) {
            return;
        }
        localStorage[key] = value;
        setLocalStorage({...localStorage})
        window.localStorage.setItem('preferences', JSON.stringify(localStorage))
    };

    return [localStorage, addToLocalStorage];
}