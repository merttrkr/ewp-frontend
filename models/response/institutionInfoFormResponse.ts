export interface ReceivingInstitutionInfoForm {
    receivingInstitutionInfo_id: number;
    university_id: number;
    universityDepartment_id: number;
    academicYear_id: number;
    academicPersonnelName: string;
    academicPersonnelSurname: string;
    academicPersonnelEmail: string;
    phoneNumberE164: string;
    phoneNumberExt: string;
}

export interface SendingInstitutionInfoForm {
    sendingInstitutionInfo_id: number;
    hei_id: string;
    universityDepartment_id: number;
    academicPersonnelName: string;
    academicPersonnelSurname: string;
    academicPersonnelEmail: string;
    administrativePersonnelName: string;
    administrativePersonnelSurname: string;
    administrativePersonnelEmail: string;
    phoneNumberE164: string;
    phoneNumberExt: string;
}



