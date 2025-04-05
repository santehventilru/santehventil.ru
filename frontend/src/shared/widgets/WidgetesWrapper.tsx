import { ToastContainer } from "react-toastify";
import ModalCart from "@shared/widgets/ModalCart/ModalCart";
import LoginRegWp from "@shared/widgets/Login/LoginRegWp";
import FavModal from "@shared/widgets/FavoriteModal/FavModa";
import FavCardBtn from "@shared/widgets/FavoriteModal/FavCartBtn";



export default function WidgetesWrapper(){
    return (
        <>
        <ModalCart />
        <FavModal/>
        <FavCardBtn/>
        <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={'custom-toast-container'}
        />
        <LoginRegWp/>
        </>
    )
}