import {useRef} from "react";

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef<number | undefined>();

    return (...args: any[]) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    }
};