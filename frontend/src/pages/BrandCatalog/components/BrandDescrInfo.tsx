import { useEffect, useState } from "react";
import { brandProductsApi } from '@api/brandApi'
import { useParams } from "react-router-dom";
import { BrandInfoIntreface } from "../type";

export default function BrandDescrBlock() {
  const { name } = useParams();
  const brandName  = name?.split('-')[1]
  console.log(brandName)

  const [brand, setBrandInfo] = useState<BrandInfoIntreface | null>(null);

  const brandInfo = async () => {
    if (!brandName) return; // Если name пустое — ничего не делаем

    try {
      const result = await brandProductsApi({ name:brandName });
      if (result) {
        console.log(result)
        setBrandInfo(result[0]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке бренда:", error);
    }
  };

  useEffect(() => {
    brandInfo();
  }, [brandName]);


  const formatDescr = brand?.description.split('.').slice(0,5)



  return (
    <>
      <h2 className="text-hd--katalog">{brandName}</h2>
      <sup className="total-count"></sup>
      {brand && (
        <div className="present-brends-wp">
          <div className="img-traget-brends-wp">
            <img
              src={brand.filename}
              alt={brand.name}
              className="img-traget-brends"
            />
          </div>
          <div className="wp-text-target-breand">
            {formatDescr?.map(p => <p key={p} className="text-target-breand">{p}.</p>)}
            
          </div>
        </div>
      )}
    </>
  );
}
