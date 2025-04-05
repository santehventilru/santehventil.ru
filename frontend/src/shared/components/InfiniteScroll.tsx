
import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "redux_tollkit/store/store";

const InfiniteScroll = ({ loadMore, style }:{loadMore:() => void, style:React.CSSProperties}) => {
    const loaderRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        {
          root: null,
          rootMargin: "400px",
          threshold: 0,
        }
      );
  
      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }
  
      return () => {
        if (loaderRef.current) {
          observer.unobserve(loaderRef.current);
        }
      };
    }, [loadMore]);
  
    return <div ref={loaderRef} style={style}></div>;
  };
// style={{ position: 'absolute', bottom: 0 }}
export default InfiniteScroll;
