export interface CollaborationCondition {
    id: number;
    bilateralAgreement_id: number;
    isPartner: number;
    academicYearStart_id: number;
    academicYearEnd_id: number;
    annualQuota: number;
    subjectArea_id: number;
    subjectAreaDescription: string;
    otherInfo: string;
    annualTotalMonths: number;
    isCoEducational: number;
    educationTypeAndLevel_id: number;
}
