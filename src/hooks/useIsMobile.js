import {useLayoutEffect, useState} from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile( window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
}