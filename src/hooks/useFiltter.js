 "use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";

export function useFiltter(searchParamsPage) {
  const router = useRouter(); 
  const searchParamsQuery = useSearchParams();

  const resolvedSearchParams = use(searchParamsPage);

  const searchQuery = searchParamsQuery.get("search") || "";
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const updateFilters = (filters) => {
    const params = new URLSearchParams(searchParamsQuery.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== searchQuery) {
        updateFilters({ search: searchTerm });
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getQueryParam = (key) => searchParamsQuery.get(key) || "";

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    updateFilters,
    getQueryParam,
    searchParamsQuery,
  };
}
