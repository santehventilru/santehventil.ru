import { useEffect, useRef, useState } from "react";

import PorductCard from "@shared/ui/ProdcutCard";
import { ProductCardInterface } from "@shared/widgets/Catalog/CatalogScroll/types";



export default function ShDefList({products, haederText}:{products:ProductCardInterface[], haederText:string}){
    const typesCard = 'hits';

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    
    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const handleScroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const offset = sliderRef.current.clientWidth;
            const newScrollPosition =
                direction === "left"
                    ? sliderRef.current.scrollLeft - offset
                    : sliderRef.current.scrollLeft + offset;

            sliderRef.current.scrollTo({
                left: newScrollPosition,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        checkScroll();

        const slider = sliderRef.current;
        let startX = 0;
        let scrollLeftStart = 0;

        const handleTouchStart = (e: TouchEvent) => {
            if (slider) {
                startX = e.touches[0].pageX;
                scrollLeftStart = slider.scrollLeft;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (slider) {
                const touchX = e.touches[0].pageX;
                const moveX = startX - touchX;
                slider.scrollLeft = scrollLeftStart + moveX;
            }
        };

        if (slider) {
            slider.addEventListener("scroll", checkScroll);
            slider.addEventListener("touchstart", handleTouchStart);
            slider.addEventListener("touchmove", handleTouchMove);
        }

        return () => {
            if (slider) {
                slider.removeEventListener("scroll", checkScroll);
                slider.removeEventListener("touchstart", handleTouchStart);
                slider.removeEventListener("touchmove", handleTouchMove);
            }
        };
    }, []);



    return <div style={{
        display:'flex',
        flexDirection:'column',
        gap:20
    }}>
        <h3>{haederText}</h3>
        <div className="hits-slider" ref={sliderRef}>
            {products && products.map(product => <PorductCard {...product} typesCard={typesCard}/>)}
        </div>

        <div style={{
            display:"flex",
            alignItems:"center",
            gap:20
        }}>
            <button className="btn-search-wp"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}>
            <svg className="svg-btn-arrow" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <button className="btn-search-wp"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}>
            <svg className="svg-btn-arrow" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
        </div>
        
    </div>
}