import BlogSection from "../ui-ux/sections/Blog_section";
import CatlogSection from "../ui-ux/sections/Catalog_section";
import HitsSeaction from "../ui-ux/sections/Hits_sections";
import PromoSection from "../ui-ux/sections/Promo_section";
import RewSection from "../ui-ux/sections/Rew_section";
import SaleProdSection from "../ui-ux/sections/SaleProd_section";



export default function Home(){
    return <main>
        <PromoSection/>
        <HitsSeaction/>
        <CatlogSection/>
        <SaleProdSection/>
        <BlogSection/>
        <RewSection/>
    </main>
}