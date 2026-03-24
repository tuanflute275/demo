// hooks/useScrollProgress.ts
import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = window.pageYOffset || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height === 0 ? 0 : Math.round((winScroll / height) * 100);
            setProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Cập nhật ngay lập tức nếu trang đã cuộn sẵn khi load
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return progress;
};