export const BASE_PATH = "http://localhost:8080";

export const PAGE_COMMENTS_PATH = BASE_PATH + "/api/";



export enum SortType {
    Chronological = 1,
    MostUpvotes,
    MostReactions,
    MyComments,
}


{/* function stringToEnum<ET, T>(enumObj: ET, str: keyof ET): T{
    return enumObj[<string>str];
*/}
export function convertStrToSortType(desiredSort : string) : SortType {
    let ret : SortType = SortType[desiredSort as keyof typeof SortType];
    console.log(`New sort type = ${ret}`);
    return ret;
    
}