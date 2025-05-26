import { useEffect, useRef } from "react";

export default function CartNoItem({text}:{text:string}) {
    const animatedBlockRef = useRef<SVGRectElement>(null);

    useEffect(() => {
        if (!animatedBlockRef.current) return;

   
        const animation = animatedBlockRef.current.animate(
            [
                { transform: 'scale(1)', opacity: 1 },
                { 
                    transform: 'scale(0.4) translate(40%, 80%) rotate(-50deg)', 
                    opacity: 0.7 
                },
                { transform: 'scale(1)', opacity: 1 }
            ],
            {
                duration: 5000,       
                iterations: Infinity, 
                easing: 'ease-in-out' 
            }
        );

     
        return () => {
            animation.cancel();
        };
    }, []);

    return (
        <div className="svgNoItem" aria-label="Пустая корзина">
            <p className="svgNoItem-text" >{text}</p>
            <svg 
                width="190" 
                height="190" 
                viewBox="0 0 190 190" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                role="img"
            >

                <rect width="90" height="90" rx="15" fill="#161B20"/>
                <rect y="100" width="90" height="90" rx="15" fill="#161B20"/>
                <rect x="100" y="100" width="90" height="90" rx="15" fill="#161B20"/>
                <rect 
                    ref={animatedBlockRef}
                    className="animated-block" 
                    x="100" 
                    y="0"
                    width="90" 
                    height="90" 
                    rx="15" 
                    fill="#161B20"
                />
            </svg>
        </div>
    );
}