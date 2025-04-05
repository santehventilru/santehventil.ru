import LoginWindow from "./components/LoginWindow"
import RegisterWindow from "./components/RegisterWindow"
import { useSelector} from "react-redux"
import {AnimatePresence, motion} from "framer-motion"
import { RootState } from "@toolkit/store/store"


export default function LoginRegWp(){

    const activeLogin = useSelector((state:RootState) => state.charLoginSlice.loginOpen)
    const avtiveRegister = useSelector((state:RootState) => state.charLoginSlice.registerOpen)
    const stateWpLoginReg = useSelector((state:RootState) => state.charLoginSlice.loginRegWpState)


    if(!stateWpLoginReg) return null

    if(stateWpLoginReg) return  <div className="modal-login">
        <AnimatePresence>
            {activeLogin && (
                    <motion.div
                        className="motion-login"
                        key="login"
                        initial={{ y: -600, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 600, opacity: 0 , position:"absolute"}}
                        transition={{ duration: 0.5 }}
                    >
                        <LoginWindow />
                    </motion.div>
                )}
        </AnimatePresence>

        <AnimatePresence>

            {avtiveRegister && (
                    <motion.div
                        className="motion-login"
                        key="register"
                        initial={{ y: -600, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 600, opacity: 0 , position:'absolute'}}
                        transition={{ duration: 0.5, }}
                    >
                        <RegisterWindow />
                    </motion.div>
                )}


        </AnimatePresence>

        
    </div>
}