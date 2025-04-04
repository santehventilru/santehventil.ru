

export default function TumblerFilter({togletumbler, tumblerActive, name, text}:{togletumbler:() => void, tumblerActive:string[], text:string, name:string}){
    return (
        <div style={{display:'flex', alignItems:'center', gap:20}}>
                <div style={{position:'relative'}} onClick={togletumbler}>
                    <div className={`tumbler-custom ${tumblerActive.includes(name) && 'tumbler-custom-active'}`} >
                        <div className={`tubmlerRound ${tumblerActive.includes(name) && 'tubmlerRound-active'}`}>

                    </div>
                </div>
                <input type="checkbox" value={name} className="checkbox-none"/>
            </div>
            <p>{text}</p>
        </div>
    )
}