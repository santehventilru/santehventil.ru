import axios from "axios";


export const  getFavApi = async () => {
    try {
        const res  = await axios.get('/api/fav')
        return res.data
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}

export const toggleFavoriteApi = async (product_id: number) => {
    try {
        const res = await axios.post('/api/favorites/toggle', {
            product_id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        return null;
    }
};
