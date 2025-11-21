"use client"
import React, { useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from './Slider.module.css';

export default function SliderBanner() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  const timeInterval = useRef();

  const handlePrev = useCallback(() => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current) swiperRef.current.slideNext();
  }, []);

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      handleNext();
    }, 3000);
    return () => {
      if (timeInterval.current) clearInterval(timeInterval.current);
    };
  }, [handleNext]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = navigationPrevRef.current;
      swiperRef.current.params.navigation.nextEl = navigationNextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination, Navigation]}
        className={styles.swiper_container}
      >
        {/* Slides */}
        <SwiperSlide>
          <div className={styles.swiper_slide}>
            <img src="/banner.png" alt="Welcome to the shop"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiper_slide}>
            <img src="/banner1.png" alt="Welcome to the shop"/>
          </div>
        </SwiperSlide> 
        <SwiperSlide>
          <div className={styles.swiper_slide}>
            <img src="/banner2.png" alt="Welcome to the shop"/>
          </div>
        </SwiperSlide>

        {/* Custom navigation buttons */}
        <div ref={navigationPrevRef} onClick={handlePrev} className={`${styles.btn} ${styles["btn-prev"]}`}>
          {"<"}
        </div>
        <div ref={navigationNextRef} onClick={handleNext} className={`${styles.btn} ${styles["btn-next"]}`}>
          {">"}
        </div>
      </Swiper>
    </>
  );
}
