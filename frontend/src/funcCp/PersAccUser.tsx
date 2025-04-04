import TabsPanel from "../ui-ux/perAccCp/Components/TabsPanel";
import PersAccWindows from "../ui-ux/perAccCp/PersAccWindowWp"


export default function PersAccUser(){

    
    const tabs = [
            { key: "acc", name:'Аккаунт'},
            { key: "address", name:'Адресс'},
            { key: "fav", name:'Избранное'},
            { key: "orders", name:'Заказы'},
            { key: "supp", name:'Поддержка'},
    ];
    return <main>
                <section id="PersonalAccount">
                    <div className="container">
                        <div className="wp-persAcc">
                            <TabsPanel tabs={tabs}/>
                            
                            <PersAccWindows/>
                                
                        </div>
                    </div>

                </section>
            </main>
}