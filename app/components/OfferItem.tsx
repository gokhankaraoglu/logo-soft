"use client";
import React from "react";
import { Icon, Icons } from "./elements/Icon";
import Spinner from "./elements/Spinner";
import Image from "next/image";
import { EntegrasyonPoliceDurumID } from "../types/product";
import { formatDate, formatName } from "../utils";
import { contractText } from "../contracts";

interface OfferItemProps {
  title: string;
  company: string;
  productCode: string;
  price: number;
  policeStatusId: EntegrasyonPoliceDurumID;
  startDate?: string;
  endDate?: string;
}

function OfferItem({
  title,
  company,
  productCode,
  price,
  policeStatusId,
  startDate,
  endDate,
}: OfferItemProps) {
  return (
    <div className="rounded-2xl max-w-[405px] w-full bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 pb-2 border-b border-gray-100">
        <div className="flex items-center mb-4">
          <Image
            src={`/${productCode}.webp`}
            alt={company}
            width="60"
            height="60"
            className="rounded-full bg-white border border-gray-200 h-16 w-16 object-contain"
          />
          <div className="ml-4 flex flex-col justify-center">
            <span className="text-base font-medium">{formatName(title)}</span>
            <span className="text-2xl font-bold mt-1">
              {EntegrasyonPoliceDurumID.TEKLIF === policeStatusId ? (
                <span>
                  <span className="font-medium">₺</span>
                  {price?.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              ) : EntegrasyonPoliceDurumID.BEKLIYOR === policeStatusId ? (
                <Spinner />
              ) : (
                <span className="flex items-center text-sm font-medium">
                  <span className="flex items-center text-2xl mr-2">
                    &#128532;
                  </span>
                  Bir hata oldu. Bilgileri kontrol ederek tekrar deneyiniz.
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center font-light text-sm mb-1">
          <Icon icon={Icons.INFO_ICON} />
          <span className="ml-1">{formatName(company)} güvencesiyle</span>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-2 text-xs font-semibold  border-b border-gray-100">
        TEKLİF BİLGİLERİ
      </div>{" "}
      <div className="px-6 py-3">
        <ul className="space-y-1">
          {contractText.map(({ title }, index) => (
            <li key={index} className="flex items-center text-sm ">
              <span className="font-medium">{title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 px-6 py-2 text-xs font-semibold border-b border-gray-100">
        POLİÇE BAŞLANGIÇ VE BİTİŞ TARİHİ
      </div>
      <div className="px-6 py-3 text-sm text-gray-700">
        <span> {formatDate(startDate)}</span> -
        <span> {formatDate(endDate)}</span>
      </div>
    </div>
  );
}

export default OfferItem;
