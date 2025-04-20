
// export const filterArray = (first<T[]>, excludeArray<U[]>, property ?: string): T[] => {
//     return mainArray.filter(mainItem => {
//         return !excludeArray.some(excludeItem => mainItem[property] === excludeItem[property]);
//     });
// }


export const filterArray = <T, U>(mainArray: T[], excludeArray: U[], property: string | number): T[] => {
    return mainArray.filter(mainItem => {
        if (property) {
            if (excludeArray.hasOwnProperty(property) && mainArray.hasOwnProperty(property)) {
                return !excludeArray.some(excludeItem => 
                    (mainItem as Record<string | number, unknown>)[property] === 
                    (excludeItem as Record<string | number, unknown>)[property]
                );
            }
            return !excludeArray.includes(mainItem as unknown as U);
        }
    });

}