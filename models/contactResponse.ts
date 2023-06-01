export interface Contact {
    id: number;
    fullName: string;
    phoneNumber: string;
    faxNumber: string;
    email: string;
    roleDescription: string;
};
export interface ContactResponse {
    Contacts?: Contact[];
};