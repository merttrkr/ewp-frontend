export interface MobilityProgrammeRequest {
  pmp_id: number;
  plannedStartingDateOfMobility: string;
  plannedEndDateOfMobility: string;
  receivingInstitutionCourseCatalogueLink: string;
  language_id: number;
  languageLevel_id: number;
  provisionsLinkIfEducationUnsuccessful: string;
}