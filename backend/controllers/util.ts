import express from 'express';
import { isUndefined } from 'util';
import * as errors from '../errors/error_definitions';

function parse_path_ints(req: express.Request){
    let ret: any = {}
    for(let key in req.params){
        let v = parseInt(req.params[key]);
        if(!isNaN(v)){
            ret[key] = v;
        }
    }
    return ret;
}

function parse_query_ints(req: express.Request){
    let ret: any = {}
    for(let key in req.query){
        console.log(key, req.query, req.query[key]);
        let v = parseInt(req.query[key] as string);
        if(!isNaN(v)){
            ret[key] = v;
        }
    }
    return ret;
}

function api_precondition(condition: boolean, err_msg: string){
    if(!condition){
        throw new errors.BadRequest(err_msg);
    }
}

function api_precondition_is_defined(val: any, err_msg: string){
    if(is_undefined(val)){
        throw new errors.BadRequest(err_msg);
    }
}

function is_undefined(v: any){
    return typeof v === 'undefined';
}

export default {
    parse_path_ints,
    parse_query_ints,
    api_precondition,
    api_precondition_is_defined,
    is_undefined
}