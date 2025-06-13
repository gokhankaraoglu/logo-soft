"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatName, getSessionStorage } from "../utils";
import { StoredPoliceItem } from "../types/product";

interface OfferProps extends Omit<StoredPoliceItem, "entegrationKey"> {
  setIsProcessing?: React.Dispatch<React.SetStateAction<boolean>>;
  formikRef: any;
  productCode: string;
}

function Offer({
  title,
  company,
  price,
  startDate,
  endDate,
  entegrationPoliceNo,
  productCode,
}: OfferProps) {
  const [userVehicle, setUserVehicle] = useState<any>(null);

  useEffect(() => {
    const vehicle: any | undefined = getSessionStorage("vehicle");
    setUserVehicle(vehicle);
  }, []);

  return (
    <>
      <div className="rounded-xl max-w-[405px] w-full bg-white p-4 border-solid border-[1px] border-[#0F1827] ">
        <div className="mb-2.5 flex">
          <Image
            src={`/${productCode}.webp`}
            alt={company}
            width="40"
            height="40"
            className="rounded-full bg-white border border-gray-200 h-12 w-12 object-contain"
          />
          <div className="ml-2.5 w-full">
            <div className="flex justify-between text-[#0F1827] text-sm font-medium align-middle md:align-top">
              <p>{formatName(title) ?? "-"}</p>
              <span>
                <span className="font-medium">₺</span>
                {price?.toLocaleString("tr-TR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="flex text-xs font-extralight text-[#667085]">
              {formatName(company)} güvencesiyle
            </p>
          </div>
        </div>
        <hr className="my-2 border-t-1 border-[#667085]" />
        {userVehicle && (
          <>
            <div className="mb-3">
              <p className="mb-2">{userVehicle.plate || "-"}</p>
              <p className="text-[#667085] text-left whitespace-normal break-words">
                {[userVehicle.year, userVehicle.brand, userVehicle.model]
                  .filter(Boolean)
                  .join(" ") || "-"}
              </p>
            </div>
            <hr className="my-2 border-t-1 border-[#667085]" />
          </>
        )}
        <div className="text-sm text-[#0F1827]">
          <div>
            <p className="font-light text-xs text-[#667085]">Poliçe No</p>
            <p className="text-sm font-normal">{entegrationPoliceNo}</p>
          </div>
          <hr className="my-2 border-t-1 border-[#667085]" />
          <div>
            <p className="font-light text-xs text-[#667085]">Ürün Adı</p>
            <p className="text-sm font-normal">{formatName(title)}</p>
          </div>
          <hr className="my-2 border-t-1 border-[#667085]" />
          <div>
            <p className="font-light text-xs text-[#667085]">
              Sigorta Başlangıç ve Bitiş Tarihi
            </p>
            <p className="text-sm font-normal">
              {startDate} - {endDate}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Offer;
