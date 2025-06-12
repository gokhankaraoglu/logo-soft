import { PoliceApiResponse, PoliceItem } from "@/app/types/product";
import { GetEntegrasyonPolicePayload } from "@/app/types/question";
import { post } from ".";
import { Paths } from "@/app/types/constants";

export async function fetchOfferList(policeId: string): Promise<PoliceItem[]> {
  const {
    Data: { Items },
  } = await post<GetEntegrasyonPolicePayload, PoliceApiResponse>({
    path: Paths.GetEntegrasyonPoliceWithGuid,
    payload: { POLICE_GUID: policeId },
  });
  return Items as PoliceItem[];
}
