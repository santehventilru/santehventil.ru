import LoginWindow from "../ui-ux/Login/LoginWindow"
import RegisterWindow from "../ui-ux/Login/RegisterWindow"
import { useSelector} from "react-redux"
import {AnimatePresence, motion} from "framer-motion"

export default function LoginRegWp(){

    const activeLogin = useSelector((state:any) => state.charLoginSlice.loginOpen)
    const avtiveRegister = useSelector((state:any) => state.charLoginSlice.registerOpen)

    return  <div className="modal-login">
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