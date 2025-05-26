import { useEffect, useRef, useState } from "react";
import { brandProductsApi } from '@api/brandApi'
import { useParams } from "react-router-dom";
import { BrandInfoIntreface } from "../type";
import {motion} from 'framer-motion'
import svgArrow from '../assets/SvgArrow.svg'


const DEFAULT_HEIGHT = 300

export default function BrandDescrBlock() {
  const { name } = useParams();
  const [height, setHeight] = useState<number>()
  const [toogle, setHandelToogle]  = useState<boolean>(false)
  const textBlockHeight  = useRef<HTMLDivElement>(null)
  const brandName  = name?.split('-')[1]

  const [brand, setBrandInfo] = useState<BrandInfoIntreface | null>(null);

  const brandInfo = async () => {
    if (!brandName) return;

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
  const handleListOpen = () => {
      setHandelToogle((bool) => !bool)
  }

  useEffect(() => {
    let block  = textBlockHeight.current
    if(block){
      const newBlockHeight  =  block?.scrollHeight + 60
      setHeight(newBlockHeight)
    }
  },[brand])

  useEffect(() => {
    brandInfo();
  }, [brandName]);

  
  const formatDescr = brand?.description.split('.').slice(0,5)



  return (
    <>
      <h2 className="text-hd--katalog">{brandName}</h2>
      <sup className="total-count"></sup>
      {brand && (
        <motion.div
        animate={{height:`${!toogle ? `${DEFAULT_HEIGHT}px` : `${height}px`}`}}
        transition={{ duration: 0.4 }}
        className="present-brends-wp" 
        >
          <div className="img-traget-brends-wp">
            <img
              src={brand.filename}
              alt={brand.name}
              className="img-traget-brends"
            />
          </div>
          <div className="wp-text-target-breand" ref={textBlockHeight}>
            {formatDescr?.map(p => <p key={p} className="text-target-breand">{p}.</p>)}
          </div>
          {height && height > 300 && 
          <div  className='dropArrowWrapper' style={{
            position:'absolute', bottom:0,
            left:0, width:'100%', height:30,
            display:'flex', alignItems:'center', justifyContent:'center',
            
          }}>
            <button style={{display:'flex', alignItems:'center', justifyContent:'center',
              width:'50%',height:'100%'
            }}  onClick={handleListOpen}>
              <img style={{
                transform:`rotate(${!toogle ?'0deg': '180deg'})`,
                transition:'all 300ms',
              }} src={svgArrow} alt="svgArrow"
              />
            </button>
          </div>
          }
          
        </motion.div>
      )}
    </>
  );
}

