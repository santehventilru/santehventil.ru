

export default function AttributeItem({attribute_name, value}: {attribute_name:string, value:string}){
    return  <div className="list-char-wp">
                <div className="name-of-char">{attribute_name}</div>
                <div className="char-dop-color">{value}</div>
            </div>
}