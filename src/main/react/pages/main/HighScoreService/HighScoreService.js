import React, { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import './HighScoreService.css';

const images = [
    "/img/makeBlogThumbnail.png",
    "/img/animationThumbnail.png",
    "/img/thumbnail.png",
    "/img/Ga4Thumbnail.png",
];

const HighScoreService = () => {
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        renderMode: 'performance',
        drag: false,
        slides: {
            perView: 4,
            spacing: 15,
        },
    });

    const intervalRef = useRef(null);

    // ✅ 자동 슬라이드 시작
    const startAutoSlide = () => {
        if (!intervalRef.current && instanceRef.current) {
            intervalRef.current = setInterval(() => {
                instanceRef.current?.next();
            }, 1234);
        }
    };

    // ✅ 자동 슬라이드 멈춤
    const stopAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    useEffect(() => {
        startAutoSlide(); // 처음에 자동 시작
        return () => stopAutoSlide(); // 컴포넌트 언마운트 시 정리
    }, [instanceRef]);

    return (
        <>
            <section className="scrolling-section">
                <div className="scrolling-title">링고가 검증한 <br/>4.8점 이상 서비스</div>
                <div
                    ref={sliderRef}
                    className="keen-slider"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={startAutoSlide}
                >
                    {images.map((src, idx) => (
                        <div className="keen-slider__slide slide" key={idx}>
                            <img src={src}
                                 alt={`Slide ${idx}`}
                                 onClick={() => window.location.href = "/lecture/lecturedetail"}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HighScoreService;
