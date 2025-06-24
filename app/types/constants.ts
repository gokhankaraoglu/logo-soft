export enum Routes {
  Home = "/",
  TeklifForm = "/teklif-form",
  TeklifListesi = "/teklif-listesi",
  SigortaTeklifi = "/sigorta-teklifi",
  Odeme = "/odeme",
}

export enum Paths {
  GetToken = "/Auth/GetToken",
  GetUrun = "/ExternalProduction/GET_URUN",
  GetPolicyDocumentWithKey = "/ExternalProduction/GET_POLICY_DOCUMENT",
  GetEntegrasyonPoliceWithGuid = "/ExternalProduction/GET_ENTEGRASYON_POLICE_WITH_GUID",
  SetTeklifGuid = "/ExternalProduction/SET_TEKLIF_GUID",
  SetTeklifUrun = "/ExternalProduction/SET_TEKLIF_URUN",
  PostPolicyQuestionAnswer = "/ExternalProduction/POST_POLICY_QUESTION_ANSWER",
  PostPolicyQuestion = "/ExternalProduction/POST_POLICY_QUESTION",
  PolicyApprovalSecurePaymentBefore = "/ExternalProduction/POLICY_APPROVAL_SECURE_PAYMENT_BEFORE",
  PolicyApprovalSecurePaymentAfter = "/ExternalProduction/POLICY_APPROVAL_SECURE_PAYMENT_AFTER",
}

const TURKIYE_SIGORTA_ID = 50091;
const AXA_SIGORTA_ID = 50003;
const SOMPO_SIGORTA_ID = 50005;

export const PAYMENT_ACTIVE_COMPANY_IDS = [
  TURKIYE_SIGORTA_ID,
  AXA_SIGORTA_ID,
  SOMPO_SIGORTA_ID,
];
