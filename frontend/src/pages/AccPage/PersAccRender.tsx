import { useDispatch } from "react-redux";
import { UserInfo } from "./Windows/pages/type";
import { AppDispatch } from "@toolkit/store/store";
import { setUserInfo } from "@toolkit/slices/logRegSlice/autorisSlice";
import TabsPanel from "./Tabs/TabsPanel";
import PersAccWindows from "./Windows/PersAccWindowWp";
import { useEffect } from "react";



const tabs = [
    { key: "acc", name: 'Аккаунт' },
    { key: "address", name: 'Адрес' },
    { key: "fav", name: 'Избранное' },
    { key: "orders", name: 'Заказы' },
    { key: "supp", name: 'Поддержка' },
];

export default function PersAccRender({data}:{data:[UserInfo]}){

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(setUserInfo(data[0]));
    },[data, dispatch])
    

    return(
        <div className="container">
            <div className="wp-persAcc">
                <TabsPanel tabs={tabs} />  
                <PersAccWindows />  
            </div>
        </div>
    )
}