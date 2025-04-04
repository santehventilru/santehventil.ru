import { useEffect, useState } from "react";


export default function ScrollUp(){
    

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 400); // Показываем кнопку после 400px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        showButton && (
            <button onClick={scrollUp} className="scroll-to-top">
                <svg  style={{height:40, width:40}}viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                <path d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#919191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                </g></svg>
            </button>
        )
    );
}