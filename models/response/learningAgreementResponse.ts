interface LearningAgreement {
    mobilityType: string;
    mobilityTypeId: number;
    studentFullName: string | null;
    studentEmail: string | null;
    EqfLevel: string | null;
    iscedFCode: string | null;
    sendingInstitutionName: string | null;
    sendingInstitutionOunitName: string | null;
    sendingAcademicPersonnelFullName: string | null;
    sendingAcademicPersonnelEmail: string | null;
    receivingInstitutionName: string | null;
    receivingInstitutionOunitName: string | null;
    receivingAcademicPersonnelFullName: string | null;
    receivingAcademicPersonnelEmail: string | null;
    plannedStartingDateOfMobility: string | null;
    plannedEndDateOfMobility: string | null;
    academicYear: string | null;
    studentSignatureStatus: string;
    sendingResponsibleSignatureStatus: string;
    receivingResponsibleSignatureStatus: string;
    id: number;
    studentInfo_id: number;
    sendingInstitutionInfo_id: number | null;
    receivingInstitutionInfo_id: number | null;
    proposedMobilityProgramme_id: number | null;
    commitment_id: number | null;
    virtualComponent_id: number | null;
    changesProposalVersionId: number | null;
}