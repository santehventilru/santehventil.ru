import { useState } from "react";
import PasswordForm from "../Components/PassworsForm";

import PersInfoFrom from "../Components/PersInfoForm";
import clsx from "clsx";
import {motion, AnimatePresence} from 'framer-motion'

export default function AccPage(){


    const [activeTab, setActiveTab] = useState<"info" | "password">("info");

    return <div className="personal-information-category-wp persAcc-data-active">
                            
    <div className="pers-info-content-wp">

    <div className="tabs-pers-info-wp">
            <button
                className={clsx("btn-tabs-persAcc-wp", {
                    "btn-tabs-persAcc-wp-active": activeTab === "info",
                })}
                onClick={() => setActiveTab("info")}
            >
                Личная информация
            </button>
            <button
                className={clsx("btn-tabs-persAcc-wp", {
                    "btn-tabs-persAcc-wp-active": activeTab === "password",
                })}
                onClick={() => setActiveTab("password")}
            >
                Сменить пароль
            </button>
        </div>

        <AnimatePresence mode="wait">

            {activeTab === "info" && <motion.div
            key="info"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <PersInfoFrom/>
            </motion.div>}

            {activeTab === "password" && <motion.div
            key="password"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}>
                <PasswordForm/>
            </motion.div>}

        </AnimatePresence>
       
        
        
    </div>
</div>
}