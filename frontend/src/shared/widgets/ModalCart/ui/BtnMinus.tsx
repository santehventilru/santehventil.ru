


export default function BtnMinus({quantity, changeQuant}:{quantity:number, changeQuant:(newQuant: number) => void}){

    

    const handeClick = () => {
        changeQuant(quantity -1)
    }



    return   <button className='item-basket-minus' onClick={handeClick}>
    <svg fill="#e3e3e3" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#e3e3e3" className='svg-basket-pop-minus'>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> <path d="M216,140H40a12,12,0,0,1,0-24H216a12,12,0,0,1,0,24Z"></path> </g>
    </svg>
</button>
}