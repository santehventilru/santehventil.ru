import { useState} from "react";

export default function useDebouncedCallback(callback: Function, delay: number) {
    const [timer, setTimer] = useState<any>(null);

    return () => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(callback, delay)); // Теперь мы вызываем callback без аргументов
    };
}