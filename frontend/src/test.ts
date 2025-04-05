import { ProductCardInterface } from "@shared/widgets/Catalog/CatalogScroll/types";


interface DuplicateResult {
  message: string;
  duplicateGroups: Map<number, ProductCardInterface[]>; 
  hasDuplicates: boolean;
}

export const findProductDuplicates = (products: ProductCardInterface[]): DuplicateResult => {
  const productMap = new Map<number, ProductCardInterface[]>();
  let hasDuplicates = false;

  products.forEach(product => {
    if (!productMap.has(product.product_id)) {
      productMap.set(product.product_id, [product]);
    } else {
      productMap.get(product.product_id)?.push(product);
      hasDuplicates = true;
    }
  });


  const duplicateGroups = new Map<number, ProductCardInterface[]>();
  productMap.forEach((products, id) => {
    if (products.length > 1) {
      duplicateGroups.set(id, products);
    }
  });

  return {
    message: hasDuplicates ? 'Есть дубликаты' : 'Нет дубликатов',
    duplicateGroups,
    hasDuplicates
  };
};