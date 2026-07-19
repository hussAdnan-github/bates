"use client";

import React, { useState, useRef } from "react";
import { Image as ImageIcon, UploadCloud, Trash2 } from "lucide-react";

export default function ImagesProducts({ onChange, onRemove }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    
    newFiles.forEach((file) => {
      const newId = Date.now() + Math.random().toString(36).substr(2, 9);
      
      const newImageObj = {
        id: newId,
        file: file,
        preview: URL.createObjectURL(file),
      };

      setImages((prev) => [...prev, newImageObj]);
      if (onChange) {
        onChange([file], newId);
      }
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // إعادة تعيين القيمة للسماح باختيار نفس الملفات مرة أخرى إذا لزم الأمر
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (onRemove) {
      onRemove(id);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mt-6">
      <div className="p-4 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900 bg-gray-50/50">
        <ImageIcon size={20} />
        <span className="font-bold">معرض صور المنتج (إضافي)</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Dropzone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-in-out cursor-pointer
            ${isDragging ? "border-purple-500 bg-purple-50 scale-[1.02]" : "border-gray-200 hover:border-purple-300 hover:bg-gray-50/50"}
          `}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={`p-4 rounded-full transition-colors duration-300 ${isDragging ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500"}`}>
            <UploadCloud size={32} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-700 mb-1">انقر أو اسحب الصور إلى هنا</h3>
            <p className="text-sm text-gray-500">يمكنك اختيار أكثر من صورة في نفس الوقت (PNG, JPG, WEBP)</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Previews */}
        {images.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-700 text-sm flex items-center gap-2">
              <span>الصور المحددة</span>
              <span className="bg-purple-100 text-purple-700 py-0.5 px-2 rounded-full text-xs">{images.length}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <img
                    src={img.preview}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(img.id);
                      }}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                      title="حذف الصورة"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}