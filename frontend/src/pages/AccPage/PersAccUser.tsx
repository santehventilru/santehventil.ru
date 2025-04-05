import TabsPanel from "./Tabs/TabsPanel";
import PersAccWindows from "./Windows/PersAccWindowWp"


export default function PersAccUser(){

    
    const tabs = [
            { key: "acc", name:'Аккаунт'},
            { key: "address", name:'Адресс'},
            { key: "fav", name:'Избранное'},
            { key: "orders", name:'Заказы'},
            { key: "supp", name:'Поддержка'},
    ];
    return <>
                <section id="PersonalAccount">
                    <div className="container">
                        <div className="wp-persAcc">
                            <TabsPanel tabs={tabs}/>  
                            <PersAccWindows/>  
                        </div>
                    </div>

                </section>
            </>
}