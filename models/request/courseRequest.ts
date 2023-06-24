export interface CourseRequest {
    courseTitle: string,
    courseCreditType_id: number,
    courseCreditValue: number,
    numberOfTerms: number,
    totalNumberOfTerms: number,
    courseCode: string,
    recognitionConditions?: string,
    courseShortDescription?: string,
    tableType?: string,
    isApproved: number,
    proposedMobilityProgramme_id: number,
    virtualComponent_id?: number,
}