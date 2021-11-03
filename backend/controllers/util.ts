import express from 'express';
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

function api_precondition(condition: boolean, err_msg: string){
    if(!condition){
        throw new errors.BadRequest(err_msg);
    }
}

function api_precondition_is_defined(val: any, err_msg: string){
    if(val === undefined){
        throw new errors.BadRequest(err_msg);
    }
}

export default {
    parse_path_ints,
    api_precondition,
    api_precondition_is_defined
}