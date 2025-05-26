import { FiltersArrInterface } from "@shared/widgets/Catalog/Filter/type";


const FilterBuilder = ({ 
    offset, 
    path, 
    filters = [] 
  }: { 
    offset: number; 
    path: string; 
    filters: FiltersArrInterface[] | [];
  }) => {


    const filterParams :FiltersArrInterface[] = filters.map(filter => ({
        attribute: filter.attribute ,
        values: filter.values
    }));

    const params = new URLSearchParams({
      categoryPath: encodeURIComponent(path),
      limit: '12',
      offset: String(offset || 0),
      sortBy: 'price',
      sortOrder: 'ASC',
      filters: JSON.stringify(filterParams) 
    }).toString();
  
    // Всегда передаём filters, даже пустой массив
    // params.append('filters', JSON.stringify(filters));
  
    return { queryString: params };
  };

  export default FilterBuilder