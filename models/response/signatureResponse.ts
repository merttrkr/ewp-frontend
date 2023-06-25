export interface SignatureResponse {
  studentSignatureInBase64: string;
  signatureForSendingInstitutionIndividualResponsibleInBase64: string;
  sendingInstitutionIndividualResponsibleFullname: string;
  sendingInstitutionIndividualResponsiblePosition: string;
  sendingInstitutionIndividualResponsibleEmail: string;
  signatureForReceivingInstitutionIndividualResponsibleInBase64: string | null;
  receivingInstitutionIndividualResponsibleFullname: string | null;
  receivingInstitutionIndividualResponsiblePosition: string | null;
  receivingInstitutionIndividualResponsibleEmail: string | null;
  commentForRejection: string | null;
}
