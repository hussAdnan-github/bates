import React from 'react'
import Department from './Department'
import SliderPrice from './SliderPrice'

function FilterContent({departmentData}) {
  return (
     <div className="space-y-6">
      {/* تم نقل الفئات إلى الأعلى */}

      {/* السعر */}
      <div className="pt-6 border-t">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 bg-[var(--primary_color)] rounded-full"></div>
          <h3 className="font-black text-xl text-[var(--secondary_color)]">تصفية السعر</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
          <SliderPrice />
        </div>
      </div>
 
    </div>
  )
}

export default FilterContent