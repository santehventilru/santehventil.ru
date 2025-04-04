import { useState, useEffect  } from 'react'
import {ClipLoader} from 'react-spinners'

type LoaderProps = {
    isLoading?: boolean;
    size?: number; 
    color?: string; 
};


const Loader: React.FC<LoaderProps> = ({ isLoading = false, size = 50, color = "#3498db" }) => {
    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        setLoading(isLoading); 
    }, [isLoading]);

    if (!loading) return null; 

    return (
        <div className="loader-container">
            <ClipLoader size={size} color={color} loading={loading} />
        </div>
    );
};

export default Loader;