import noitem from '../assets/svg/NoItemIcon.svg'

export default function NoItem({text}:{text:string}){
    return <div style={{position:'relative'}}>
        <img src={noitem} alt="noitem"/>
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>{text}</div>
    </div>
}