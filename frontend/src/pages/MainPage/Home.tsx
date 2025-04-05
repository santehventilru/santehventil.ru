import BlogSection from "./ui/Blog_section";
import CatlogSection from "./ui/Catalog_section";
import HitsSeaction from "@shared/components/Hits_sections";
import PromoSection from "./components/Promo_section";
import RewSection from "@shared/widgets/Rew/Rew_section";
import SaleProdSection from "./components/SaleProd_section";



export default function Home(){
    return (
        <>
            <PromoSection/>
            <HitsSeaction/>
            <CatlogSection/>
            <SaleProdSection/>
            <BlogSection/>
            <RewSection/>
        </>
    )
}