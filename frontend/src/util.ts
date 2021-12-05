import { useEffect, useRef } from "react";

export default function onUpdate(cb: () => void, deps: any[]){
    const initRef = useRef(false);

    useEffect(() => {
        if(initRef.current){
            cb()
        }else{
            initRef.current = true;
        }
    }, deps);
}