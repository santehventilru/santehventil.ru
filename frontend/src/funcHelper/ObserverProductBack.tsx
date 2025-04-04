import { useEffect, useRef } from "react";

export default function ObserverProductBack({ loadBack }: { loadBack: () => void }) {
    const divContainer = useRef<HTMLDivElement | null>(null);
    

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting ) {
                    loadBack();
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0,
            }
        );

        if (divContainer.current) {
            observer.observe(divContainer.current);
        }

        return () => {
            if (divContainer.current) {
                observer.unobserve(divContainer.current);
            }
        };
    }, [loadBack]);

    return <div ref={divContainer} style={{ width: "100%", gridColumnStart: 12 }}></div>;
}
