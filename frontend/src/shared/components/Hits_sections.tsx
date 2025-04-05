import { useEffect, useState, useRef } from "react";
import PorductCard from "../ui/ProdcutCard";

import ProdCardLoader from "../ui/PordCardsLoader";

import { useGetProductsQuery } from "@reduxApi/productsApi";
import { ProductCardInterface } from "@shared/widgets/Catalog/CatalogScroll/types";

export default function HitsSection() {
    const [products, setProducts] = useState<ProductCardInterface[] | null>(null);

    const arr = [1, 2, 3, 4, 5, 6, 7];
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(true);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const {data = [], isError, isLoading, isSuccess} = useGetProductsQuery('hits')


    

    useEffect(() => {
        if (isSuccess) {
            setProducts([...data]);
        }
    }, [isSuccess, data])

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
    }, [products]);

    if(isError) return <div>Ошибка загрузки</div>
    

    const typesCard = 'hits';

    return (
        <section id="hits">
            <div className="container container-hits">
                <div className="hits-slider-container">
                    <button
                        className="btn-f container-hits-bt--lf"
                        onClick={() => handleScroll("left")}
                        disabled={!canScrollLeft}
                    >
                        
                    </button>
                    <button
                        className="btn-f container-hits-bt--rt"
                        onClick={() => handleScroll("right")}
                        disabled={!canScrollRight}
                    >
                        
                    </button>
                    <h2 className="text-title">Хиты продаж</h2>
                    <div className="hits-slider" ref={sliderRef}>
                        {products && products.map((item) => (
                            <PorductCard key={item.product_id} {...item} typesCard={typesCard} />
                        ))}
                        {isLoading && arr.map((item) => (
                            <ProdCardLoader key={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
