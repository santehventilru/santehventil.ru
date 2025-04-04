import axios from "axios";


export const postAutoSelectPlaceApi =  async (query:string) => {
    try {
        const res  = await axios.post('/api/dadata/palace',{
            query
        })
        return res.data
    } catch (error) {
        console.error('Error daData', error);
        return null;
    }
}