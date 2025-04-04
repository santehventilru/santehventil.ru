import {motion , AnimatePresence} from 'framer-motion'
import { useSelector} from 'react-redux'
import AccPage from './Pages/AccPage';
import AddressPage from './Pages/AddressPage';
import FavPage from './Pages/FavPage';
import OrdersPage from './Pages/OrderaPage';
import SupPage from './Pages/SupPage';
import AdminOrderMain from '../Admin/AdminOrderMain';
import AdminServiceMain from '../Admin/AdiminServiceMain';
// import AdminUserMain from '../Admin/AdminUserMain';


export default function PersAccWindows(){
    

    const activeTab = useSelector((state:any) => state.categorTabsSlice.activeTabs)

    const tabs = [
        { key: "acc", label: "Аккаунт", content: <AccPage/> },
        { key: "address", label: "Адреса", content: <AddressPage /> },
        { key: "fav", label: "Избранное", content: <FavPage /> },
        { key: "orders", label: "Заказы", content: <OrdersPage /> },
        { key: "supp", label: "Поддержка", content: <SupPage /> },
        { key: "adminorder", label: "Все закакзы", content: <AdminOrderMain/> },
        { key: "adminservice", label: "Все заявки на услуги", content: <AdminServiceMain/> },
        // { key: "adminuser", label: "Все пользователи", content: <AdminUserMain/> },
    ];



    return <div className="persAcc-data-wp">

            <AnimatePresence mode='wait'>
                {tabs.map(tab =>
                    activeTab === tab.key ? (
                        
                            <motion.div
                                key={tab.key}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                            >
                                {tab.content} 
                            </motion.div>
                        
                    ) : null
                )}
            </AnimatePresence>




    </div>
}