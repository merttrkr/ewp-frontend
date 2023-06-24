export interface Course {
    id: number;
    courseCreditType: string;
    courseTitle: string;
    courseCreditValue: number;
    numberOfTerms: number;
    totalNumberOfTerms: number;
    courseCode: string;
    status: string;
    recognitionConditions?: string;
    courseShortDescription?: string;
    virtualComponent_id?: number;
}
