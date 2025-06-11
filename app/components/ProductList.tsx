"use client";
import { setSessionStorage } from "../utils";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading";
import { useEffect } from "react";

function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const URUN_AD = searchParams.get("URUN_AD");
    const URUN_KOD = searchParams.get("URUN_KOD");
    const URUN_ID = searchParams.get("URUN_ID");
    const uniqueId = searchParams.get("uniqueId");

    if (URUN_AD && URUN_KOD && URUN_ID) {
      setSessionStorage("product", {
        URUN_AD,
        URUN_KOD,
        URUN_ID,
      });
    } else {
      setSessionStorage("product", {
        URUN_ID: 10,
        URUN_KOD: "TRF",
        URUN_AD: "TRAFİK SİGORTASI",
      });
    }
    router.push(`/teklif-form?uniqueId=${uniqueId}`);
  }, []);

  return <Loading />;
}

export default ProductList;
