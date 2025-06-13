"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { Icon, Icons } from "../components/elements/Icon";
import CustomButton from "../components/elements/CustomButton";
import { createExpirationDate, getSessionStorage } from "../utils";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { StoredPoliceItem } from "../types/product";
import Spinner from "../components/elements/Spinner";
import Footer from "../components/Footer";
import Offer from "../components/Offer";
import { GUID } from "../hooks/useSetGuid";
import { submitPolicyApprovalSecurePayment } from "../utils/api/payment";

function SelectedOffer() {
  const router = useRouter();
  const formikRef = useRef<any>(null);
  const [police, setPolice] = useState<StoredPoliceItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const selectedPolice: StoredPoliceItem | undefined =
      getSessionStorage("selected-police");

    if (!selectedPolice) {
      router.push("/");
      return;
    }

    setPolice(selectedPolice);
  }, []);

  async function handleSendForm() {
    if (!police?.entegrationId) {
      return;
    }
    const expirationDate = createExpirationDate(6);
    if (setIsProcessing) {
      setIsProcessing(true);
    }
    const locationUrl = window.location.href;
    const baseURL = new URL(locationUrl).origin;

    const { REDIRECT_URL, TRANSACTION_ID: transactionId } =
      await submitPolicyApprovalSecurePayment(
        police?.entegrationId,
        null,
        `${baseURL}/odeme/geri-donus`
      );
    const policeGuid: string | undefined = Cookies.get(GUID);
    if (!policeGuid) {
      router.push("/teklif-form");
      return;
    }

    if (REDIRECT_URL) {
      const payloadValue = [police?.entegrationId, transactionId, REDIRECT_URL];
      const payloadValueJSON = JSON.stringify(payloadValue);
      Cookies.set(policeGuid, payloadValueJSON, { expires: expirationDate });
      window.location.href = REDIRECT_URL;
    }
  }

  return (
    <>
      <div className="pt-16 flex flex-col justify-between custom-min-height">
        <div className="flex flex-col items-center">
          <Link
            href="/teklif-listesi"
            className="mb-11 inline-block self-start"
          >
            <span className="flex items-center">
              <Icon icon={Icons.ARROW_LEFT} />
              {/* <span className="ml-3 font-semibold text-xl">Teklife Dön</span> */}
            </span>
          </Link>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold">Sigorta Teklifi</h2>
            <p className="text-[#667085] font-extralight text-lg">
              Teklifin detayları aşağıdaki gibidir. Onaylayarak ödeme adımına
              geçebilirsiniz.
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center mb-2.5">
            {police ? (
              <Offer
                formikRef={formikRef}
                setIsProcessing={setIsProcessing}
                {...police}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <CustomButton
            className="mb-3.5"
            disabled={!police?.entegrationId || isProcessing}
            onClick={() => {
              handleSendForm();
            }}
          >
            {isProcessing
              ? "Ödeme sayfasına yönlendiriliyorsunuz..."
              : "Devam Et"}
          </CustomButton>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default SelectedOffer;
