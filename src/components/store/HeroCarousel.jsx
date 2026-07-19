"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, EffectFade } from "swiper/modules";

// استيراد أنماط Swiper الأساسية
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const defaultSlides = [
  {
    id: 1,
    src: "/images/heroStore.jpg",

  },


];

export default function HeroCarousel({ banners = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const actualSlides = banners && banners.length > 0
    ? banners.map((b) => ({
      id: b.id,
      src: b.image,
      title: b.name || 'صورة العرض',
    }))
    : defaultSlides;

  if (actualSlides.length === 0) return null;

  return (
    <div className="relative w-full md:max-w-6xl md:mx-auto md:px-6 md:py-8 lg:max-w-7xl" dir="rtl">
      {/* الكاروسيل الرئيسي */}
      <div className="relative w-full h-[200px] md:h-[450px] lg:h-[500px] md:rounded-[2rem] md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group md:border-[6px] md:border-white/60 dark:md:border-gray-800/60 backdrop-blur-xl">
        <Swiper
          modules={[Thumbs, Autoplay, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {actualSlides.map((slide) => (
            <SwiperSlide key={`main-${slide.id}`}>
              <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900">
                <Image
                  src={slide.src}
                  alt={slide.title || 'صورة العرض'}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {/* تأثير متدرج للظلال لإبراز الصور */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent hidden md:block"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* شريط الصور المصغرة الدائرية (Thumbs Pagination) داخل السلايدر */}
        <div className="absolute bottom-2 md:bottom-6 left-0 right-0 z-20 flex justify-center pb-2 md:pb-0">
          <div className="w-[95%] md:w-[60%] lg:w-[45%]">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={6} // عرض 6 صور مصغرة
              freeMode={true}
              watchSlidesProgress={true}
              slideToClickedSlide={true} // يسمح بالتنقل عند النقر على الصورة المصغرة
              modules={[Thumbs]}
              className="thumbs-swiper px-2 py-2"
            >
              {actualSlides.map((slide) => (
                <SwiperSlide
                  key={`thumb-${slide.id}`}
                  className="cursor-pointer flex justify-center group"
                >
                  {/* دائرة الصورة المصغرة والتأثيرات عند التفعيل */}
                  <div className="relative w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden border-[2px] md:border-[3px] border-white/50 md:border-white transition-all duration-300 opacity-60 md:opacity-70 grayscale hover:grayscale-0 hover:opacity-100 group-[.swiper-slide-thumb-active]:border-[var(--primary_color)] group-[.swiper-slide-thumb-active]:opacity-100 group-[.swiper-slide-thumb-active]:grayscale-0 group-[.swiper-slide-thumb-active]:scale-110 mx-auto">
                    <Image
                      src={slide.src}
                      alt={`thumbnail ${slide.title || 'صورة مصغرة'}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
