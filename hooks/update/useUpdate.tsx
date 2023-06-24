import {
  ReceivingInstitutionInfoForm,
  SendingInstitutionInfoForm,
} from '@/models/response/institutionInfoFormResponse';
import { OrganizationInfoFormRequest } from '@/models/request/organizationInfoFormRequest';
import { OrganizationRequestToIIA } from '@/models/request/organizationRequestToIIA';
import { CollaborationConditionRequest } from '@/models/request/collaborationConditionRequest';
import { StudentInfoRequest } from '@/models/request/studentInfoRequest';
import { SendingInstitutionInfo } from '@/models/request/sendingInstitutionInfoRequest';
import { MobilityProgrammeRequest } from '@/models/request/mobilityProgrammeRequest';
import { IIANotificationRequest } from '@/models/request/IIANotificationRequest';
import { ReceivingInstitutionInfo } from '@/models/request/receivingInstitutionInfoRequest';
import { CourseRequest } from '@/models/request/courseRequest';

const useUpdate = () => {
  const makeRequest = async <T,>(request: string): Promise<T> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    return response.text() as Promise<T>;
  };

  //https://localhost:5001/spInsertEmptyRowToBilateralAgreement?bilateralAgreement_id=1
  const InsertEmptyRowToBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToCollaborationCondition?collaborationCondition_id=1
  const InsertEmptyRowToCollaborationCondition = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToCommitment?commitment_id=1
  const InsertEmptyRowToCommitment = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToLearningAgreement?learningAgreement_id=1
  const InsertEmptyRowToLearningAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToOrganizationInfo?organizationInfo_id=1
  const InsertEmptyRowToOrganizationInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToProposedMobilityProgramme?pmp_id=1
  const InsertEmptyRowToProposedMobilityProgramme = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToReceivingInstitutionInfo?receivingInstitutionInfo_id=1
  const InsertEmptyRowToReceivingInstitutionInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToSendingInstitutionInfo?sendingInstitutioInfo_id=1
  const InsertEmptyRowToSendingInstitutionInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertEmptyRowToStudentInfo?studentInfo_id=1&mobilityType_id=1
  const InsertEmptyRowToStudentInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };
  //https://localhost:5001/spInsertEmptyRowToVirtualComponent?virtualComponent_id=1
  const InsertEmptyRowToVirtualComponent = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spInsertLASelectedCourse?courseTitle=a&courseCreditType_id=2&courseCreditValue=1&numberOfTerms=2&totalNumberOfTerms=24&courseCode=dffd&recognitionConditions=sdd&courseShortDescription=aaa&tableType=2&isApproved=1&proposedMobilityProgramme_id=3
  const InsertLASelectedCourse = async (
    request: CourseRequest
  ): Promise<number> => {
    const {
      courseTitle,
      courseCreditType_id,
      courseCreditValue,
      numberOfTerms,
      totalNumberOfTerms,
      courseCode,
      recognitionConditions,
      courseShortDescription,
      tableType,
      isApproved,
      proposedMobilityProgramme_id,
    } = request;
    const encodedCourseTitle = encodeURIComponent(courseTitle);
    const encodedCourseCode = encodeURIComponent(courseCode);
    const encodedRecognitionConditions = encodeURIComponent(
      recognitionConditions ?? ''
    );
    const encodedCourseShortDescription = encodeURIComponent(
      courseShortDescription ? courseShortDescription : ''
    );
    let url = `https://localhost:5001/spInsertLASelectedCourse?courseTitle=${encodedCourseTitle}&courseCreditType_id=${courseCreditType_id}&courseCreditValue=${courseCreditValue}&numberOfTerms=${numberOfTerms}&totalNumberOfTerms=${totalNumberOfTerms}&courseCode=${encodedCourseCode}&recognitionConditions=${encodedRecognitionConditions}&courseShortDescription=${encodedCourseShortDescription}&isApproved=${isApproved}&proposedMobilityProgramme_id=${proposedMobilityProgramme_id}`;

    if (tableType !== undefined) {
      url += `&tableType=${tableType}`;
    }
    const result: number = await makeRequest<number>(url);

    return result;
  };

  //https://localhost:5001/spInsertLAVirtualCourse?courseTitle=HCI&courseCreditType_id=1&courseCreditValue=2&numberOfTerms=4&totalNumberOfTerms=12&courseCode=322&recognitionConditions=none&courseShortDescription=none&tableType=C&isApproved=0&virtualComponent_id=34
  const InsertLAVirtualCourse = async (
    request: CourseRequest
  ): Promise<number> => {
    const {
      courseTitle,
      courseCreditType_id,
      courseCreditValue,
      numberOfTerms,
      totalNumberOfTerms,
      courseCode,
      recognitionConditions,
      courseShortDescription,
      tableType,
      isApproved,
      virtualComponent_id,
    } = request;
    const encodedCourseTitle = encodeURIComponent(courseTitle);
    const encodedCourseCode = encodeURIComponent(courseCode);
    const encodedRecognitionConditions = encodeURIComponent(
      recognitionConditions ?? ''
    );
    const encodedCourseShortDescription = encodeURIComponent(
      courseShortDescription ? courseShortDescription : ''
    );

    let url = `https://localhost:5001/spInsertLAVirtualCourse?courseTitle=${encodedCourseTitle}&courseCreditType_id=${courseCreditType_id}&courseCreditValue=${courseCreditValue}&numberOfTerms=${numberOfTerms}&totalNumberOfTerms=${totalNumberOfTerms}&courseCode=${encodedCourseCode}&recognitionConditions=${encodedRecognitionConditions}&courseShortDescription=${encodedCourseShortDescription}&tableType=${tableType}&isApproved=${isApproved}&virtualComponent_id=${virtualComponent_id}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  const UpdateDateOfBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    return result;
  };

  //https://localhost:5001/spAddOrganizationInfoToBilateralAgreement?organizationInfo_id=1&bilateralAgreement_id=2&isPartner=0'
  const AddOrganizationInfoToBilateralAgreement = async (
    request: OrganizationRequestToIIA
  ): Promise<number> => {
    const { organizationInfoId, isPartner, bilateralAgreementId } = request;

    const url = `https://localhost:5001/spAddOrganizationInfoToBilateralAgreement?organizationInfo_id=${organizationInfoId}&bilateralAgreement_id=${bilateralAgreementId}&isPartner=${isPartner}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  const AddReceivingInstitutionInfo = async (
    request: ReceivingInstitutionInfoForm
  ): Promise<number> => {
    const {
      receivingInstitutionInfo_id,
      university_id,
      universityDepartment_id,
      academicYear_id,
      academicPersonnelName,
      academicPersonnelSurname,
      academicPersonnelEmail,
      phoneNumberE164,
      phoneNumberExt,
    } = request;

    const url = `https://localhost:5001/spAddReceivingInstitutionInfo?receivingInstitutionInfo_id=${receivingInstitutionInfo_id}&university_id=${university_id}&universityDepartment_id=${universityDepartment_id}&academicYear_id=${academicYear_id}&academicPersonnelName=${academicPersonnelName}&academicPersonnelSurname=${academicPersonnelSurname}&academicPersonnelEmail=${academicPersonnelEmail}&phoneNumberE164=${phoneNumberE164}&phoneNumberExt=${phoneNumberExt}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  const AddSendingInstitutionInfo = async (
    request: SendingInstitutionInfoForm
  ): Promise<number> => {
    const {
      sendingInstitutionInfo_id,
      hei_id,
      universityDepartment_id,
      academicPersonnelName,
      academicPersonnelSurname,
      academicPersonnelEmail,
      administrativePersonnelName,
      administrativePersonnelSurname,
      administrativePersonnelEmail,
      phoneNumberE164,
      phoneNumberExt,
    } = request;

    const url = `https://localhost:5001/spAddSendingInstitutionInfo?sendingInstitutionInfo_id=${sendingInstitutionInfo_id}&hei_id=${hei_id}&universityDepartment_id=${universityDepartment_id}&academicPersonnelName=${academicPersonnelName}&academicPersonnelSurname=${academicPersonnelSurname}&academicPersonnelEmail=${academicPersonnelEmail}&administrativePersonnelName=${administrativePersonnelName}&administrativePersonnelSurname=${administrativePersonnelSurname}&administrativePersonnelEmail=${administrativePersonnelEmail}&phoneNumberE164=${phoneNumberE164}&phoneNumberExt=${phoneNumberExt}`;
    const result: number = await makeRequest<number>(url);

    return result;
  };

  //https://localhost:5001/spSaveOrganizationInfo?id=${id}&university_id=${university_id}&universityDepartment_id=${universityDepartment_id}&signingDate=${signingDate}&isPartner=${isPartner}&IIACode=${IIACode}&IIAId=${IIAId}&bilateralAgreement_id=${bilateralAgreement_id}
  const SaveOrganizationInfo = async (
    request: OrganizationInfoFormRequest
  ): Promise<number> => {
    const {
      id,
      university_id,
      universityDepartment_id,
      signingDate,
      isPartner,
      IIACode,
      IIAId,
      bilateralAgreement_id,
    } = request;

    const url = `https://localhost:5001/spSaveOrganizationInfo?id=${id}&university_id=${university_id}&universityDepartment_id=${universityDepartment_id}&signingDate=${signingDate}&isPartner=${isPartner}&IIACode=${IIACode}&IIAId=${IIAId}&bilateralAgreement_id=${bilateralAgreement_id}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };
  //https://localhost:5001/spSetUniversityIdOfOrganizationInfo?hei_id=iyte.edu.tr&organizationInfo_id=21
  const SetUniversityIdOfOrganizationInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    return result;
  };

  //https://localhost:5001/spSetSigningPerson?organizationInfo_id=21&signingPerson_id=1
  const SetSigningPerson = async (request: string): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    return result;
  };
  //https://localhost:5001/spAddOrganizationContactInfo?organizationInfo_id=21&contact_id=1
  const AddOrganizationContactInfo = async (
    request: string
  ): Promise<string> => {
    console.log(request + ' request');

    const result: string = await makeRequest<string>(request);
    return result;
  };
  //https://localhost:5001/spSetCreatorOfBilateralAgreement?bilateralAgreement_id=21
  const SetCreatorOfBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spAddLanguageSkillForCollaborationCondition?collaborationCondition_id=1&lang_id=1&langLevel_id=1
  const AddLanguageSkillForCollaborationCondition = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  /*https://localhost:5001/spSaveCollaborationCondition?id=1&bilateralAgreement_id=1&isPartner=1&
  academicYearStart_id=1&academicYearEnd_id=1&annualQuota=1&subjectArea_id=1&subjectAreaDescript
  ion=test&otherInfo=test&annualTotalMonths=5&isCoEducational=1&educationTypeAndLevel_id=1*/

  const SaveCollaborationCondition = async (
    request: CollaborationConditionRequest
  ): Promise<number> => {
    const {
      id,
      bilateralAgreement_id,
      isPartner,
      academicYearStart_id,
      academicYearEnd_id,
      annualQuota,
      subjectArea_id,
      subjectAreaDescription,
      otherInfo,
      annualTotalMonths,
      isCoEducational,
      educationTypeAndLevel_id,
    } = request;
    const encodedSubjectAreaDescription = encodeURIComponent(
      subjectAreaDescription
    );
    const encodedOtherInfo = encodeURIComponent(otherInfo);

    const url = `https://localhost:5001/spSaveCollaborationCondition?id=${id}&bilateralAgreement_id=${bilateralAgreement_id}&isPartner=${isPartner}&academicYearStart_id=${academicYearStart_id}&academicYearEnd_id=${academicYearEnd_id}&annualQuota=${annualQuota}&subjectArea_id=${subjectArea_id}&subjectAreaDescription=${encodedSubjectAreaDescription}&otherInfo=${encodedOtherInfo}&annualTotalMonths=${annualTotalMonths}&isCoEducational=${isCoEducational}&educationTypeAndLevel_id=${educationTypeAndLevel_id}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  //https://localhost:5001/spAddCollaborationConditionToBilateralAgreement?collaborationCondition_id=1&bilateralAgreement_id=1&isPartner=0
  const AddCollaborationConditionToBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };

  //https://localhost:5001/spUpdateStateOfBilateralAgreement?bilateralAgreement_id=21&new_state=Taslak
  const UpdateStateOfBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };
  //https:localhost:5001/spSaveStudentInfo?studentInfo_id=1&mobilityType_id=1&name=ilayda&surname=%C3%B6zel&gender_id=2&nationality_id=1&birthdate=2000.06.05&educationTypeAndLevel_id=2&email=example%40gmail.com&subjectArea_id=1&subjectAreaDescription=none&global_id=affsdgsg&omobility_id=ahsjsjd
  const SaveStudentInfo = async (
    request: StudentInfoRequest
  ): Promise<number> => {
    const {
      studentInfo_id,
      mobilityType_id,
      name,
      surname,
      gender_id,
      nationality_id,
      birthdate,
      educationTypeAndLevel_id,
      email,
      subjectArea_id,
      subjectAreaDescription,
      global_id,
      omobility_id,
    } = request;
    const encodedName = encodeURIComponent(name);
    const encodedSurname = encodeURIComponent(surname);
    const encodedEmail = encodeURIComponent(email);
    const encodedSubjectAreaDescription = encodeURIComponent(
      subjectAreaDescription
    );

    const url = `https://localhost:5001/spSaveStudentInfo?studentInfo_id=${studentInfo_id}&mobilityType_id=${mobilityType_id}&name=${encodedName}&surname=${encodedSurname}&gender_id=${gender_id}&nationality_id=${nationality_id}&birthdate=${birthdate}&educationTypeAndLevel_id=${educationTypeAndLevel_id}&email=${encodedEmail}&subjectArea_id=${subjectArea_id}&subjectAreaDescription=${encodedSubjectAreaDescription}&global_id=${global_id}&omobility_id=${omobility_id}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };
  //https://localhost:5001/spSaveReceivingInstitutionInfo?receivingInstitutionInfo_id=1&university_id=1&universityDepartment_id=1&academicYear_id=1&academicPersonnelName=asd&academicPersonnelSurname=asdd&academicPersonnelEmail=afsgs%40gmail.com&phoneNumberE164=123jhasjkas&phoneNumberExt=21889920
  const SaveReceivingInstitutionInfo = async (
    request: ReceivingInstitutionInfo
  ): Promise<number> => {
    const {
      receivingInstitutionInfo_id,
      university_id,
      universityDepartment_id,
      academicYear_id,
      academicPersonnelName,
      academicPersonnelSurname,
      academicPersonnelEmail,
      phoneNumberE164,
      phoneNumberExt,
    } = request;
    const encodedAcademicPersonnelName = encodeURIComponent(
      academicPersonnelName
    );
    const encodedAcademicPersonnelSurname = encodeURIComponent(
      academicPersonnelSurname
    );
    const encodedAcademicPersonnelEmail = encodeURIComponent(
      academicPersonnelEmail
    );

    const url = `https://localhost:5001/spSaveReceivingInstitutionInfo?receivingInstitutionInfo_id=${receivingInstitutionInfo_id}&university_id=${university_id}&universityDepartment_id=${universityDepartment_id}&academicYear_id=${academicYear_id}&academicPersonnelName=${encodedAcademicPersonnelName}&academicPersonnelSurname=${encodedAcademicPersonnelSurname}&academicPersonnelEmail=${encodedAcademicPersonnelEmail}&phoneNumberE164=${phoneNumberE164}&phoneNumberExt=${phoneNumberExt}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  //https://localhost:5001/spSaveSendingInstitutionInfo?sendingInstitutionInfo_id=1&hei_id=iyte.edu.tr&universityDepartment_id=1&academicPersonnelName=fafa&academicPersonnelSurname=ahahha&academicPersonnelEmail=w%40gmail.com&administrativePersonnelName=a&administrativePersonnelSurname=b&administrativePersonnelEmail=a%40gmail.com&phoneNumberE164=1234456&phoneNumberExt=123
  const SaveSendingInstitutionInfo = async (
    request: SendingInstitutionInfo
  ): Promise<number> => {
    const {
      sendingInstitutionInfo_id,
      hei_id,
      universityDepartment_id,
      academicPersonnelName,
      academicPersonnelSurname,
      academicPersonnelEmail,
      administrativePersonnelName,
      administrativePersonnelSurname,
      administrativePersonnelEmail,
      phoneNumberE164,
      phoneNumberExt,
    } = request;
    const encodedAcademicPersonnelName = encodeURIComponent(
      academicPersonnelName
    );
    const encodedAcademicPersonnelSurname = encodeURIComponent(
      academicPersonnelSurname
    );
    const encodedAcademicPersonnelEmail = encodeURIComponent(
      academicPersonnelEmail
    );
    const encodedAdministrativePersonnelName = encodeURIComponent(
      administrativePersonnelName
    );
    const encodedAdministrativePersonnelSurname = encodeURIComponent(
      administrativePersonnelSurname
    );
    const encodedAdministrativePersonnelEmail = encodeURIComponent(
      administrativePersonnelEmail
    );

    const url = `https://localhost:5001/spSaveSendingInstitutionInfo?sendingInstitutionInfo_id=${sendingInstitutionInfo_id}&hei_id=${hei_id}&universityDepartment_id=${universityDepartment_id}&academicPersonnelName=${encodedAcademicPersonnelName}&academicPersonnelSurname=${encodedAcademicPersonnelSurname}&academicPersonnelEmail=${encodedAcademicPersonnelEmail}&administrativePersonnelName=${encodedAdministrativePersonnelName}&administrativePersonnelSurname=${encodedAdministrativePersonnelSurname}&administrativePersonnelEmail=${encodedAdministrativePersonnelEmail}&phoneNumberE164=${phoneNumberE164}&phoneNumberExt=${phoneNumberExt}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  //https:localhost:5001/spSaveReceivingInstitutionInfoIdToLearningAgreementTable?receivingInstitutionInfo_id=10&learningAgreement_id=2
  const SaveReceivingInstitutionInfoIdToLearningAgreementTable = async (
    request: string
  ): Promise<number> => {
    const result: number = await makeRequest<number>(request);
    return result;
  };
  //https://localhost:5001/spSaveSendingInstitutionInfoIdToLearningAgreementTable?sendingInstitutionInfo_id=34&learningAgreement_id=122
  const SaveSendingInstitutionInfoIdToLearningAgreementTable = async (
    request: string
  ): Promise<number> => {
    const result: number = await makeRequest<number>(request);
    return result;
  };

  // https://localhost:5001/spSavePlannedStartingDateOfMobility?pmp_id=56&plannedStartingDateOfMobility=2026.06.07
  const SavePlannedStartingDateOfMobility = async (
    request: string
  ): Promise<number> => {
    const response: number = await makeRequest<number>(request);
    return response;
  };

  //https://localhost:5001/spSavePlannedEndDateOfMobility?pmp_id=57&plannedEndDateOfMobility=2022.07.08
  const SavePlannedEndDateOfMobility = async (
    request: string
  ): Promise<number> => {
    const response: number = await makeRequest<number>(request);
    return response;
  };

  // https://localhost:5001/spSaveProposedMobilityProgramme?pmp_id=56&plannedStartingDateOfMobility=2027.06.07&plannedEndDateOfMobility=2027.06.07&receivingInstitutionCourseCatalogueLink=asdsdxs&language_id=2&languageLevel_id=2&provisionsLinkIfEducationUnsuccessful=gajhsjas
  const SaveProposedMobilityProgramme = async (
    request: MobilityProgrammeRequest
  ): Promise<number> => {
    const {
      pmp_id,
      plannedStartingDateOfMobility,
      plannedEndDateOfMobility,
      receivingInstitutionCourseCatalogueLink,
      language_id,
      languageLevel_id,
      provisionsLinkIfEducationUnsuccessful,
    } = request;

    const encodedReceivingInstitutionCourseCatalogueLink = encodeURIComponent(
      receivingInstitutionCourseCatalogueLink
    );
    const encodedProvisionsLinkIfEducationUnsuccessful = encodeURIComponent(
      provisionsLinkIfEducationUnsuccessful
    );

    const url = `https://localhost:5001/spSaveProposedMobilityProgramme?pmp_id=${pmp_id}&plannedStartingDateOfMobility=${plannedStartingDateOfMobility}&plannedEndDateOfMobility=${plannedEndDateOfMobility}&receivingInstitutionCourseCatalogueLink=${encodedReceivingInstitutionCourseCatalogueLink}&language_id=${language_id}&languageLevel_id=${languageLevel_id}&provisionsLinkIfEducationUnsuccessful=${encodedProvisionsLinkIfEducationUnsuccessful}`;

    const result: number = await makeRequest<number>(url);

    return result;
  };

  // https://localhost:5001/spSaveReceivingInstitutionCourseCatalogueLink?pmp_id=45&receivingInstitutionCourseCatalogueLink=www.ilayda.com
  const SaveReceivingInstitutionCourseCatalogueLink = async (
    request: string
  ): Promise<number> => {
    const result: number = await makeRequest<number>(request);

    return result;
  };

  //https://localhost:5001/spSaveLanguageId?pmp_id=3&language_id=5
  const SaveLanguageId = async (request: string): Promise<number> => {
    const result: number = await makeRequest<number>(request);

    return result;
  };

  //https://localhost:5001/spSaveLanguageLevelId?pmp_id=3&languageLevel_id=10
  const SaveLanguageLevelId = async (request: string): Promise<number> => {
    const result: number = await makeRequest<number>(request);

    return result;
  };
  //https://localhost:5001/sendNotificationToPartner?notifier_hei_id=iyte.edu.tr&iia_id=773B75A4-35E9-4E8F-966C-10179654F697&partner_hei_id=selcuk.edu.tr
  const sendIIANotification = async (
    request: IIANotificationRequest
  ): Promise<number> => {
    const { notifier_hei_id, iia_id, partner_hei_id } = request;

    const url = `https://localhost:5001/sendNotificationToPartner?notifier_hei_id=${notifier_hei_id}&iia_id=${iia_id}&partner_hei_id=${partner_hei_id}`;
    const result: number = await makeRequest<number>(url);

    return result;
  };
  //https://localhost:5001/spSaveVirtualComponent?virtualComponent_id=81
  const SaveVirtualComponent = async (request: string): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };
  //https://localhost:5001/spSaveVirtualComponentIdToLearningAgreementTable?virtualComponent_id=81&learningAgreement_id=45
  const SaveVirtualComponentIdToLearningAgreementTable = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);
    return result;
  };
  return {
    sendIIANotification,
    UpdateStateOfBilateralAgreement,
    AddCollaborationConditionToBilateralAgreement,
    SaveCollaborationCondition,
    AddLanguageSkillForCollaborationCondition,
    SetCreatorOfBilateralAgreement,
    AddOrganizationContactInfo,
    SetUniversityIdOfOrganizationInfo,
    SetSigningPerson,
    UpdateDateOfBilateralAgreement,
    SaveOrganizationInfo,
    SaveSendingInstitutionInfoIdToLearningAgreementTable,
    AddSendingInstitutionInfo,
    AddReceivingInstitutionInfo,
    AddOrganizationInfoToBilateralAgreement,
    SaveStudentInfo,
    SaveSendingInstitutionInfo,
    SaveReceivingInstitutionInfo,
    SaveReceivingInstitutionInfoIdToLearningAgreementTable,
    SavePlannedStartingDateOfMobility,
    SavePlannedEndDateOfMobility,
    SaveProposedMobilityProgramme,
    SaveReceivingInstitutionCourseCatalogueLink,
    SaveLanguageId,
    SaveLanguageLevelId,

    SaveVirtualComponent,
    SaveVirtualComponentIdToLearningAgreementTable,

    InsertLASelectedCourse,
    InsertLAVirtualCourse,

    InsertEmptyRowToVirtualComponent,
    InsertEmptyRowToStudentInfo,
    InsertEmptyRowToSendingInstitutionInfo,
    InsertEmptyRowToReceivingInstitutionInfo,
    InsertEmptyRowToOrganizationInfo,
    InsertEmptyRowToBilateralAgreement,
    InsertEmptyRowToProposedMobilityProgramme,
    InsertEmptyRowToCollaborationCondition,
    InsertEmptyRowToCommitment,
    InsertEmptyRowToLearningAgreement,
  };
};

export default useUpdate;
