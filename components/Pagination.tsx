"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-6 space-x-4">

      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </Link>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`px-4 py-2 rounded ${currentPage === page ? "bg-AppPrimary text-white" : "bg-gray-200 text-black"}`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </div>
  );
}
