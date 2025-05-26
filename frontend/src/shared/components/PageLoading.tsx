
import box from'../assets/svg/svgBoxLoading.svg'

const COUNTLINER = [1,2,3,4,5]
export default function PageLoading(){

    return (
        <div style={{display:'flex',gap:20, alignItems:'center', flexDirection:'column',justifyContent:'space-between', height:'100vh', padding:20, boxSizing:'border-box'}}>
            {COUNTLINER.map(line => <LinerLoad key={line}/>)}
        </div>
    )
}

const LinerLoad = () => {
    return <div className="shiny-button">
    <img  style={{width:'100%'}}
    src={box} alt="" />
</div>
}