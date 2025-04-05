import TabsPanel from "@pages/AccPage/Tabs/TabsPanel"
import PersAccWindows from "@pages/AccPage/Windows/PersAccWindowWp"





export default function PersAccAdmin(){
    // return <main>
    //     <AdminMain/>
    // </main>

    // const dispatch = useDispatch()

    // useEffect(dispatch())
    // const activeTab = useSelector((state:any) => state.categorTabsSlice.activeTabs)
    const tabs = [
        {key: "adminorder", name:'Урпавление заказами'},
        {key: "adminservice", name:'Управление услугами'},
        {key: "adminuser", name:'Урпавление пользователями'},
        { key: "acc", name:'Аккаунт'},
        
        // { key: "address", name:'Адресс'},
        // { key: "fav", name:'Избранное'},
        // { key: "orders", name:'Заказы'},
        // { key: "supp", name:'Поддержка'},
]
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