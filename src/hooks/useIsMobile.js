import {useWindowSize} from "@uidotdev/usehooks";
import {useEffect, useState} from "react";

const useIsMobile = () => {
    const size = useWindowSize()
    const [isMobile, setIsMobile] = useState(size.width <= 768)
    useEffect(() => setIsMobile(size.width <= 768), [size]);

    return isMobile;
}

export default useIsMobile;