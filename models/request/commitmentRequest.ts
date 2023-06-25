export interface CommitmentRequest {
    sendingHeiId: string;
    commitment_id: number;
    studentSignature: string;
    sendingHeiSignature: string;
    sendingHeiResponsibleFullname: string;
    sendingHeiResponsiblePosition: string;
    sendingHeiResponsibleEmail: string;
    receivingHeiSignature: string;
    receivingHeiResponsibleFullname: string;
    receivingHeiResponsiblePosition: string;
    receivingHeiResponsibleEmail: string;
    commentForRejection: string;
}
