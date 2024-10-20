"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchParamsWrapper = ({ children }) => {
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    const idParam = searchParams.get("id");
    setId(idParam);
  }, [searchParams]);

  if (id === null) {
    return <div>Loading...</div>; // Or a more appropriate loading state
  }

  return children(id);
};

export default SearchParamsWrapper;
