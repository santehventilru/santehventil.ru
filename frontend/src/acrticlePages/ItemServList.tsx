import svg from '@svgShared/itemServ.svg'

export default function ItemServList({text}:{text:string}){
    return <div className="item-serv-list">
        <img src={svg} alt="" />
        <p className='service-text'>{text}</p>
    </div>
}