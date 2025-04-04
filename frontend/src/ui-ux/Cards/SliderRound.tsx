


export default function SliderRound({isIndex, slideIndex}:{isIndex:number, slideIndex:number}){
    return <div className="art-slider-round">
                <div className={`art-slider-round-no-act ${ isIndex === slideIndex && 'art-slider-round-active'}`}>

                </div>
            </div>
}