import CategoryItem from "../Items/CategoryItem"
import ExitItem from "../Items/ExpitItem"

export interface TabsInterface{
    key:string,
    name:string
}

export default function TabsPanel({tabs}:{tabs:TabsInterface[]}){
    return <div className="persAcc-categori-wp">
                <div className="categor-items-list-wp">
                    <h3 className="text-acc--myAcc">Мой аккаунт</h3>
                    <ul className="category-wp">
                        {tabs.map((categ) => <CategoryItem catagor={categ.key} text={categ.name}/>)}
                    </ul>
                </div>
                <div className="categori-exit-wp">
                    <ul className="">
                       <ExitItem/>
                    </ul>
                </div>
            </div>
}