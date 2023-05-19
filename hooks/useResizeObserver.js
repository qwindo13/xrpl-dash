import { useState, useEffect, useRef } from 'react';

const useResizeObserver = () => {
    const [dimensions, setDimensions] = useState({});
    const ref = useRef(null);

    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setDimensions(entry.contentRect);
            });
        });

        if (observeTarget) {
            resizeObserver.observe(observeTarget);
        }

        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref]);

    return [ref, dimensions];
};

export default useResizeObserver;
