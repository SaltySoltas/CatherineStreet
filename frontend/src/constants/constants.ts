import * as types from './types'

{/* function stringToEnum<ET, T>(enumObj: ET, str: keyof ET): T{
    return enumObj[<string>str];
*/}
export function convertStrToSortType(desiredSort : string) : types.SortType {
    let ret : types.SortType = types.SortType[desiredSort as keyof typeof types.SortType];
    console.log(`New sort type = ${ret}`);
    return ret;
    
}