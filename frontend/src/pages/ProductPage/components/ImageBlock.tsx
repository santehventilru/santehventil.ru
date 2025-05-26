import { useState } from "react";
import { ImageProductPage, PorductFromProdPage } from "../type";
import ProdImageItem from "../ui/ProdIamgeItem";


export default function ImageBlock({product, productImages}:{product:PorductFromProdPage, productImages: ImageProductPage[]}){

    const [currentImgage, setCurrent] =  useState<ImageProductPage>({add_image: product.main_image})
    const [moreImage, setMore] = useState<ImageProductPage[]>(productImages)


    const changeImage = (imgUrl:string) => {
        const newDopImage = moreImage.filter(img => img.add_image !== imgUrl)
        setMore([...newDopImage, currentImgage])
        setCurrent({add_image: imgUrl})
    }

    return (
        <div className="prodcut-big-item">               
            <ul className="dop-foto-prod-wp">
                {moreImage && moreImage.map(image => <ProdImageItem key={image.add_image}  newImage={product.main_image} changeImage={changeImage} {...image}/>)}
            </ul>
            
            <div id="main" className="main-foto-wp">
                 <img src={currentImgage && currentImgage.add_image} alt="" className="img-tovar-main"/> 
            </div>
        </div>
    )
}