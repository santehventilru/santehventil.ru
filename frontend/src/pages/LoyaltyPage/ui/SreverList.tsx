import svg from '../assets/itemServ.svg'

export default function ServList({text}:{text:string}){
    return <div className="item-serv-list">
        <img src={svg} alt="" />
        <p className='service-text'>{text}</p>
    </div>
}