export interface SendingInstitutionInfoResponse {
    id: number;
    university_id: number;
    universityDepartment_id: number;
    academicPersonnelContactName: string;
    academicPersonnelContactSurname: string;
    academicPersonnelContactEmail: string;
    administrativePersonnelContactName: string;
    administrativePersonnelContactSurname: string;
    administrativePersonnelContactEmail: string;
    phoneNumberE164: string;
    phoneNumberExt: string;
}