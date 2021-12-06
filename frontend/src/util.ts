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

export function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }