import { useState, useEffect, useRef } from 'react';

const useResizeObserver = () => {
    const [dimensions, setDimensions] = useState({});
    const ref = useRef(null);

    useEffect(() => {
        const observeTarget = ref.current;
        
        if (!observeTarget) {
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setDimensions(entry.contentRect);
            });
        });

        resizeObserver.observe(observeTarget);

        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref.current]);  // observe changes in ref.current not ref

    return [ref, dimensions];
};


export default useResizeObserver;
