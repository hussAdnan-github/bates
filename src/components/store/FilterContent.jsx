import React from 'react'
import Department from './Department'
import SliderPrice from './SliderPrice'

function FilterContent({departmentData}) {
  return (
     <div className="space-y-6">
      {/* الفئات */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 bg-[#FFC107] rounded-full"></div>
          <h3 className="font-black text-xl text-[#2D1B50]">الفئات</h3>
        </div>
        <Department department={departmentData} />
      </div>

      {/* السعر */}
      <div className="pt-6 border-t">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 bg-[#FFC107] rounded-full"></div>
          <h3 className="font-black text-xl text-[#2D1B50]">تصفية السعر</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
          <SliderPrice />
        </div>
      </div>

      {/* بطاقة الإعلان */}
      <div className="mt-8 p-4 bg-[#2D1B50] rounded-xl text-center">
        <p className="text-[#FFC107] text-xs font-bold mb-1">شحن مجاني</p>
        <p className="text-white text-[10px] opacity-80">للطلبات الأكثر من 500 ريال</p>
      </div>
    </div>
  )
}

export default FilterContent