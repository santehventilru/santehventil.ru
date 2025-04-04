
export const parseCategoryPath = (path:string) => {
    const segments = path.split('/');
    return segments.map(segment => parseInt(segment.split('-')[0], 10)); 
};