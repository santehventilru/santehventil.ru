import Footer from "./Footer/Footer"
import HeaderWrapper from "./Header/HeaderWrapper";

type MainLayoutProps = {
    children: React.ReactNode; 
  };

export default function MainLayouts({children}:MainLayoutProps){
    return (
        <>
        <HeaderWrapper/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
    )
}