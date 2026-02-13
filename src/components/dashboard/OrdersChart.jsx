// "use client";
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const data = [
//   { name: 'قبل 7 أيام', orders: 9 },
//   { name: 'قبل 6 أيام', orders: 3 },
//   { name: 'قبل 5 أيام', orders: 2 },
//   { name: 'قبل 4 أيام', orders: 5 },
//   { name: 'قبل 3 أيام', orders: 3 },
//   { name: 'أمس', orders: 19 },
//   { name: 'اليوم', orders: 12 },
// ];

// const OrdersChart = () => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full" dir="ltr">
//       <div className="flex justify-end mb-6">
//         <h2 className="text-lg font-bold text-gray-800">الطلبات الجديدة (آخر 7 أيام)</h2>
//       </div>
      
//       <div className="h-[300px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//             <XAxis 
//               dataKey="name" 
//               axisLine={false} 
//               tickLine={false} 
//               tick={{fill: '#9ca3af', fontSize: 12}}
//               dy={10}
//             />
//             <YAxis 
//               axisLine={false} 
//               tickLine={false} 
//               tick={{fill: '#9ca3af', fontSize: 12}} 
//             />
//             <Tooltip />
//             <Legend 
//               verticalAlign="top" 
//               align="center" 
//               iconType="square"
//               formatter={(value) => <span className="text-gray-600 text-sm">عدد الطلبات</span>}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="orders" 
//               stroke="#2D1B4D" 
//               strokeWidth={3} 
//               dot={{ r: 4, fill: '#2D1B4D' }} 
//               activeDot={{ r: 6 }} 
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default OrdersChart;


"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // تأكد من مسار المكون في مشروعك

// 1. تعريف البيانات
const chartData = [
  { day: "قبل 7 أيام", orders: 9 },
  { day: "قبل 6 أيام", orders: 3 },
  { day: "قبل 5 أيام", orders: 2 },
  { day: "قبل 4 أيام", orders: 5 },
  { day: "قبل 3 أيام", orders: 3 },
  { day: "أمس", orders: 19 },
  { day: "اليوم", orders: 12 },
];

// 2. إعدادات الألوان والأسماء (Shadcn Config)
const chartConfig = {
  orders: {
    label: "عدد الطلبات",
    color: "#2D1B4D", // لون الخط الأرجواني الداكن الخاص بك
  },
};

export default function OrdersChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
      {/* العنوان */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
            {/* مربع اللون الصغير في الليجند */}
            <div className="w-3 h-3 bg-[#2D1B4D] rounded-sm"></div>
            <span className="text-sm text-gray-500 font-medium">عدد الطلبات</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">الطلبات الجديدة (آخر 7 أيام)</h2>
      </div>

      {/* حاوية الرسم البياني من Shadcn */}
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 10
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
          
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            // لتعديل اتجاه النص في المحور الأفقي
            tickFormatter={(value) => value}
            reversed={true} // لأن الواجهة عربية، نبدأ من اليمين
          />

          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tickMargin={10}
          />

          {/* التولتيب الاحترافي من Shadcn */}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          {/* رسم الخط */}
          <Line
            dataKey="orders"
            type="monotone"
            stroke="var(--color-orders)" // يستخدم اللون من الـ config تلقائياً
            strokeWidth={3}
            dot={{
              fill: "var(--color-orders)",
              r: 4,
            }}
            activeDot={{
              r: 6,
              strokeWidth: 2,
              stroke: "#fff"
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}