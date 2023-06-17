import {
  ReceivingInstitutionInfoForm,
  SendingInstitutionInfoForm,
} from '@/models/response/institutionInfoFormResponse';
import { OrganizationInfoFormRequest } from '@/models/request/organizationInfoFormRequest';
import { OrganizationRequestToIIA } from '@/models/request/organizationRequestToIIA';
import { CollaborationConditionRequest } from '@/models/request/collaborationConditionRequest';
import { StudentInfoRequest } from '@/models/request/studentInfoRequest';
import { InstitutionInfoRequest } from '@/models/request/institutionInfoRequest';

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

  //https://localhost:5001/spInsertLASelectedCourse
  const InsertLASelectedCourse = async (
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

  //https://localhost:5001/spUpdateLastUpdateDateOfBilateralAgremeent?bilateralAgreement_id=1
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

  //https://localhost:5001/spSaveSendingInstitutionInfo?sendingInstitutionInfo_id=1&hei_id=iyte.edu.tr&universityDepartment_id=1&academicPersonnelName=fafa&academicPersonnelSurname=ahahha&academicPersonnelEmail=w%40gmail.com&administrativePersonnelName=a&administrativePersonnelSurname=b&administrativePersonnelEmail=a%40gmail.com&phoneNumberE164=1234456&phoneNumberExt=123
  const SaveSendingInstitutionInfo = async (
    request: InstitutionInfoRequest
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

  //  https:localhost:5001/spSaveReceivingInstitutionInfoIdToLearningAgreementTable?receivingInstitutionInfo_id=10&learningAgreement_id=2
  const SaveReceivingInstitutionInfoIdToLearningAgreementTable = async (
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

  return {
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
    AddSendingInstitutionInfo,
    AddReceivingInstitutionInfo,
    AddOrganizationInfoToBilateralAgreement,
    SaveStudentInfo,
    SaveSendingInstitutionInfo,
    SaveReceivingInstitutionInfoIdToLearningAgreementTable,
    SavePlannedStartingDateOfMobility,
    SavePlannedEndDateOfMobility,

    InsertLASelectedCourse,

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
