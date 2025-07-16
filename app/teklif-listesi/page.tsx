"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { Icon, Icons } from "../components/elements/Icon";
import { useEffect, useState, useCallback } from "react";
import { delay, getSessionStorage, setSessionStorage } from "../utils";
import { EntegrasyonPoliceDurumID, PoliceItem } from "../types/product";
import Spinner from "../components/elements/Spinner";
import { fetchOfferList } from "../utils/api/offer";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import OfferItem from "../components/OfferItem";
import CustomButton from "../components/elements/CustomButton";
import InsuranceDetailDialog from "../dialogs/InsuranceDetailDialog";
import { PAYMENT_ACTIVE_COMPANY_IDS } from "../types/constants";

function OfferList() {
  const router = useRouter();
  const [showContract, setShowContract] = useState(false);
  const [offerList, setOfferList] = useState<PoliceItem[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<PoliceItem | undefined>(
    undefined
  );
  const [userVehicle, setUserVehicle] = useState<any>(null);

  function isPaymentActiveCompany(companyId: number): boolean {
    return PAYMENT_ACTIVE_COMPANY_IDS.includes(companyId);
  }
  useEffect(() => {}, []);

  useEffect(() => {
    const policeId: string | undefined = Cookies.get("policeId");
    const vehicle: any | undefined = getSessionStorage("vehicle");
    setUserVehicle(vehicle);

    if (!policeId) {
      router.push("/");
      return;
    }

    fetchOffer(policeId);
  }, []);

  const fetchOffer = useCallback(async (policeId: string) => {
    try {
      const offers = await fetchOfferList(policeId);
      if (
        offers.some(
          (offer) =>
            offer.ENTEGRASYON_POLICE_DURUM_ID ===
            EntegrasyonPoliceDurumID.BEKLIYOR
        )
      ) {
        await delay(3000);
        fetchOffer(policeId);
      }
      setOfferList(offers);
    } catch (error) {
      console.error("Failed to fetch police data", error);
    }
  }, []);

  const selectOffer = (offer: PoliceItem) => {
    setSessionStorage("selected-police", {
      title: offer.URUN_AD,
      company: offer.SGR_SIRKET_MUSTERI_ROL_AD,
      entegrationId: offer.ENTEGRASYON_POLICE_HAREKET_ID,
      entegrationKey: offer.ENTEGRASYON_POLICE_HAREKET_KEY,
      entegrationPoliceNo: offer.ENTEGRASYON_POLICE_NO,
      productCode: offer.ENTEGRASYON_URUN_KOD,
      startDate: offer.BASLAMA_TARIH,
      endDate: offer.BITIS_TARIH,
      price: offer.TOPLAM_PRIM,
      model: offer.MARKA_TIP_AD,
      brand: offer.MARKA_AD,
      deviceValue: offer.CIHAZ_BEDEL,
    });
    router.push("/sigorta-teklifi");
  };
  return (
    <>
      <div className="pt-16 flex flex-col justify-between custom-min-height">
        <div className="flex flex-col items-center">
          <Link href="/" className="mb-11 inline-block self-start">
            <span className="flex items-center">
              <Icon icon={Icons.ARROW_LEFT} />
            </span>
          </Link>
          {offerList.length > 0 ? (
            <>
              <p className="text-[#667085] font-extralight text-lg mb-2 text-center">
                Aracınıza ait sigorta tekliflerini burada görüntüleyebilirsiniz.
              </p>
              <div className="w-full flex flex-col justify-center items-center gap-y-6 mb-6 max-w-[405px]">
                <div className="w-full px-6 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <div className="bg-white px-6 py-2 text-xs font-semibold  border-b border-gray-100">
                    ARAÇ BİLGİLERİ
                  </div>
                  {userVehicle && (
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm ">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-900 mr-2"></span>
                        <span>{userVehicle.plate || "-"}</span>
                      </li>
                      <li className="flex items-center text-sm ">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-900 mr-2"></span>
                        <span>
                          {userVehicle.year || "-"} {userVehicle.brand || "-"}{" "}
                          {userVehicle.model || "-"}
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
                {offerList.map((offer) => {
                  const isSelected =
                    selectedOffer?.ENTEGRASYON_POLICE_HAREKET_ID ===
                    offer.ENTEGRASYON_POLICE_HAREKET_ID;
                  const isActivePayment = isPaymentActiveCompany(
                    offer.SGR_SIRKET_MUSTERI_ROL_ID
                  );
                  return isActivePayment ? (
                    <div
                      key={offer.ENTEGRASYON_POLICE_HAREKET_ID}
                      onClick={() => setSelectedOffer(offer)}
                      className={`w-full flex justify-center cursor-pointer transition-all
                        ${
                          isSelected
                            ? "ring-2 ring-blue-600 bg-blue-50 shadow-lg"
                            : "hover:ring-2 hover:ring-blue-300 hover:bg-blue-100"
                        }
                      rounded-2xl`}
                    >
                      <OfferItem
                        title={offer.ENTEGRASYON_URUN_AD}
                        company={offer.SGR_SIRKET_MUSTERI_ROL_AD}
                        productCode={offer.ENTEGRASYON_URUN_KOD}
                        price={offer.TOPLAM_PRIM_TL}
                        policeStatusId={offer.ENTEGRASYON_POLICE_DURUM_ID}
                        startDate={offer.BASLAMA_TARIH}
                        endDate={offer.BITIS_TARIH}
                        offerValidityDate={
                          offer.TEKLIF_GECERLILIK_TARIH as string
                        }
                      />
                    </div>
                  ) : null;
                })}
              </div>
            </>
          ) : (
            <Spinner className="self-center" />
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <CustomButton
            className="mb-3.5"
            saturated
            visible={
              EntegrasyonPoliceDurumID.TEKLIF !==
              selectedOffer?.ENTEGRASYON_POLICE_DURUM_ID
            }
            onClick={() => setShowContract(true)}
          >
            Koruma Kapsamları
          </CustomButton>
          <Footer />
        </div>
      </div>
      <InsuranceDetailDialog
        isOpen={showContract}
        confirm={() =>
          selectedOffer?.TOPLAM_PRIM_TL && selectOffer(selectedOffer)
        }
        close={() => setShowContract(false)}
      />
    </>
  );
}

export default OfferList;
