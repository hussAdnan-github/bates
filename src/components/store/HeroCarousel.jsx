"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/actions/product";

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

export default function HeroCarousel({ banners = [], companyId = null }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // جلب البيانات في الخلفية لتجاوز كاش السيرفر وتحديث العرض فوراً
  const { data: liveBanners } = useQuery({
    queryKey: ["live_banners", companyId],
    queryFn: async () => {
      const res = await getBanners(companyId, true);
      const allBanners = res?.results || (Array.isArray(res) ? res : []);
      return companyId 
        ? allBanners.filter(b => b.companies && b.companies.includes(Number(companyId)))
        : allBanners;
    },
    initialData: banners,
    staleTime: 0,
    refetchOnMount: true,
  });

  const displayBanners = liveBanners && liveBanners.length > 0 ? liveBanners : banners;

  const actualSlides = displayBanners && displayBanners.length > 0
    ? displayBanners.map((b) => ({
      id: b.id,
      src: b.image,
      title: b.name || 'صورة العرض',
    }))
    : defaultSlides;

  if (actualSlides.length === 0) return null;

  return (
    <div className="relative w-full md:max-w-6xl md:mx-auto md:px-6 md:py-8 lg:max-w-7xl" dir="rtl">
      {/* الكاروسيل الرئيسي */}
      <div className="relative w-full md:rounded-[2rem] md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group md:border-[6px] md:border-white/60 dark:md:border-gray-800/60 backdrop-blur-xl">
        <Swiper
          modules={[Thumbs, Autoplay, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          autoHeight={true}
          className="w-full"
        >
          {actualSlides.map((slide, index) => (
            <SwiperSlide key={`main-${slide.id}`}>
              <div className="relative w-full bg-gray-100 dark:bg-gray-900 flex">
                <img
                  src={slide.src}
                  alt={slide.title || 'صورة العرض'}
                  className="w-full h-auto object-cover block"
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
              className="thumbs-swiper px-2 py-3.5"
            >
              {actualSlides.map((slide) => (
                <SwiperSlide
                  key={`thumb-${slide.id}`}
                  className="cursor-pointer flex justify-center group py-1"
                >
                  {/* دائرة الصورة المصغرة والتأثيرات عند التفعيل */}
                  <div className="relative w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden border-[2px] md:border-[3px] border-white/50 md:border-white transition-all duration-300 opacity-60 md:opacity-70 grayscale hover:grayscale-0 hover:opacity-100 group-[.swiper-slide-thumb-active]:border-[var(--primary_color)] group-[.swiper-slide-thumb-active]:opacity-100 group-[.swiper-slide-thumb-active]:grayscale-0 group-[.swiper-slide-thumb-active]:scale-110 mx-auto">
                    <Image
                      src={slide.src}
                      alt={`thumbnail ${slide.title || 'صورة مصغرة'}`}
                      fill
                      sizes="80px"
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
