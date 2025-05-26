

export default function BtnDelete({deleteProduct}:{deleteProduct:() => void}){
    return <button className="basket-modal-button-delete" onClick={deleteProduct}>
        <div className="nav-cart-cont" >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-corzina">
                <path d="M1 21L11 11L1 21ZM21 1L11 11L21 1ZM11 11L1 1L11 11ZM11 11L21 21L11 11Z" fill="#7880B5"/>
                <path d="M1 21L11 11M11 11L21 1M11 11L1 1M11 11L21 21" stroke="#7880B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>  
    </button>
}