export interface BlockArticleInterface{
    headerText:string,
    index:number,
    desText:string,
    pluses:string[],
    minuses:string[]
}

export default function DescrBlock({headerText,index,desText, pluses, minuses  }:BlockArticleInterface){
    return <p style={{display:'flex', flexDirection:'column', gap:10, marginBottom:1}}>
    <h4>
        {index}. {headerText}
    </h4>
    
    <div>
        {desText}
    </div>
    
    <div>
        ✅ Плюсы:
        <ul style={{listStyleType:'initial', listStylePosition:'inside', padding:'0  0 0 1%', boxSizing:'border-box'}}>
            {pluses.map(plus => <li key={plus}>{plus}</li>)}
        </ul>
    </div>
    <div>
        ❌ Минусы:
        <ul style={{listStyleType:'initial', listStylePosition:'inside', padding:'0  0 0 1%', boxSizing:'border-box'}}>
            {minuses.map(minus => <li key={minus}>{minus}</li>)}
        </ul>
    </div>
</p>
}