export interface FilterItemInterface{
    value:string, 
    product_count:string,
    attribut:string
}
export interface FilterBlockInterface{
    attribut:string, 
    filetBlockList:FilterItemInterface[]
}
export interface FiltersArrInterface{
    attribute: string,
    values: string[]
}