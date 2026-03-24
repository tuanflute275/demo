import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Cuộn về đầu trang ngay lập tức khi pathname thay đổi
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Dùng 'instant' để tránh cảm giác bị trễ khi chuyển trang
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;