import { useEffect, useRef } from "react"

// interface Options{
//     keyframes:Keyframe[]
//     options:KeyframeAnimationOptions
// }
export default function ErrorMessage(){
    const blocks = useRef<(SVGRectElement | null)[]>([]);

    useEffect(() => {

        const animations = Array.from({ length: 5 }, (_, i) => {

            const randomX = Math.floor(Math.random() * 41) - 25; // -20..20
            const randomY = Math.floor(Math.random() * 41) - 25; // -20..20
            
            return {
                keyframes: [
                    { transform: 'translate(0)' },
                    { transform: `translate(${i * 5 + randomX}px)` }, 
                    { transform: `translate(${randomX}px, ${randomY}px)` }, 
                    { transform: 'translate(0)' }
                ],
                options: { 
                    duration: 5000, 
                    iterations: Infinity, 
                    delay: i * 200, 
                    composite: 'add' as const
                }
            };
        });

        blocks.current.forEach((block, index) => {
            if (block && animations[index]) {
                block.animate(animations[index].keyframes, animations[index].options);
            }
        });

        return () => {
            blocks.current.forEach(block => {
                block?.getAnimations()?.forEach(anim => anim.cancel());
            });
        };
    }, []);

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', height:'50vh'}}>
            <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', textAlign:'center'}}>Ой ой произошла какая-то техническая неполадка</div>
            <svg width="412" height="270" viewBox="0 0 412 270" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect ref={el => blocks.current[0] = el} x="0.945312" y="133.977" width="90" height="90" rx="15" transform="rotate(-45 0.945312 133.977)" fill="#161B20"/>
            <rect x="212.559" y="206.219" width="90" height="90" rx="15" transform="rotate(-45 212.559 206.219)" fill="#161B20"/>
            <rect  ref={el => blocks.current[1] = el} x="71.1406" y="205.197" width="90" height="90" rx="15" transform="rotate(-45 71.1406 205.197)" fill="#161B20"/>
            <rect  ref={el => blocks.current[2] = el} x="283.781" y="136.021" width="90" height="90" rx="15" transform="rotate(-45 283.781 136.021)" fill="#161B20"/>
            <rect x="142.363" y="135" width="90" height="90" rx="15" transform="rotate(-45 142.363 135)" fill="#161B20"/>
            <rect ref={el => blocks.current[3] = el} x="213.582" y="64.8008" width="90" height="90" rx="15" transform="rotate(-45 213.582 64.8008)" fill="#161B20"/>
            <rect  ref={el => blocks.current[4] = el}x="72.1641" y="63.7793" width="90" height="90" rx="15" transform="rotate(-45 72.1641 63.7793)" fill="#161B20"/>
            </svg>

        </div>
    )
}