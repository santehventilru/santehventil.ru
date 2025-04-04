import { useEffect, useRef } from "react";

const InfiniteScroll = ({ loadMore }: { loadMore: () => void }) => {
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore(); // Вызываем loadMore, если элемент виден
                }
            },
            {
                root: null, // Наблюдаем за элементами относительно видимой области
                rootMargin: "400px", 
                threshold: 0, // Срабатывает при 0% видимости
            }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current); // Наблюдаем за элементом
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current); // Отменяем наблюдение при размонтировании
            }
        };
    }, [loadMore]);

    return <div ref={loaderRef}></div>; // Ссылка на элемент, за которым нужно следить
};

export default InfiniteScroll;
