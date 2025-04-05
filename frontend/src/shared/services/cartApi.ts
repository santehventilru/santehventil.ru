import Api from "@api/apiService"

export const AddToCart = <T,P>(url:string, data: T) => {
   return Api.post<P>(url, data)
}