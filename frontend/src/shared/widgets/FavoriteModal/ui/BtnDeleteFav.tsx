import svgCross from '@shared/assets/svg/SvgCross.svg'







export default function BtnDeleteFav({toogleFav}:{toogleFav:() => void}){


    return <button className="basket-modal-button-delete" onClick={toogleFav}> 
        <div className="nav-cart-cont">
           <img className="svg-corzina" src={svgCross} alt={'svgCross'} />
        </div>  
    </button>
}