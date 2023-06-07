import {
  ReceivingInstitutionInfoForm,
  SendingInstitutionInfoForm,
} from '@/models/institutionInfoFormResponse';
import { OrganizationInfoFormRequest } from '@/models/organizationInfoFormRequest';
import { OrganizationRequestToIIA } from '@/models/organizationRequestToIIA';

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

    console.log('result sendingInstitutionInfo_id:', result);
    return result;
  };

  //https://localhost:5001/spUpdateLastUpdateDateOfBilateralAgremeent?bilateralAgreement_id=1
  const UpdateDateOfBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    console.log('result: ', result);
    return result;
  };

  //https://localhost:5001/spAddOrganizationInfoToBilateralAgreement?organizationInfo_id=1&bilateralAgreement_id=2&isPartner=0'
  const AddOrganizationInfoToBilateralAgreement = async (
    request: OrganizationRequestToIIA
  ): Promise<number> => {
    const { organizationInfoId, isPartner, bilateralAgreementId } = request;

    const url = `https://localhost:5001/spAddOrganizationInfoToBilateralAgreement?organizationInfo_id=${organizationInfoId}&bilateralAgreement_id=${bilateralAgreementId}&isPartner=${isPartner}`;

    const result: number = await makeRequest<number>(url);

    console.log('result bilateralAgreementID:', result);
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

    console.log('result receivingInstitutionInfo_id:', result);
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

    console.log('result sendingInstitutionInfo_id:', result);
    return result;
  };

  //https://localhost:5001/spSaveOrganizationInfo?id=${id}&university_id=${university_id}&universityDepartment_id=${universityDepartment_id}&signingDate=${signingDate}&isPartner=${isPartner}&IIACode=${IIACode}&IIAId=${IIAId}&bilateralAgreement_id=${bilateralAgreement_id}
  const saveOrganizationInfo = async (
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

    console.log('result organizationInfoId:', result);
    return result;
  };
  //https://localhost:5001/spSetUniversityIdOfOrganizationInfo?hei_id=iyte.edu.tr&organizationInfo_id=21
  const SetUniversityIdOfOrganizationInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    console.log('result: ', result);
    return result;
  };

  //https://localhost:5001/spSetSigningPerson?organizationInfo_id=21&signingPerson_id=1
  const SetSigningPerson = async (request: string): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    console.log('result: ', result);
    return result;
  };
  //https://localhost:5001/spAddOrganizationContactInfo?organizationInfo_id=21&contact_id=1
  const AddOrganizationContactInfo = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    console.log('result: ', result);
    return result;
  };
  //https://localhost:5001/spSetCreatorOfBilateralAgreement?bilateralAgreement_id=21
  const SetCreatorOfBilateralAgreement = async (
    request: string
  ): Promise<string> => {
    const result: string = await makeRequest<string>(request);

    console.log('result: ', result);
    return result;
  };
  return {
    SetCreatorOfBilateralAgreement,
    AddOrganizationContactInfo,
    SetUniversityIdOfOrganizationInfo,
    SetSigningPerson,
    UpdateDateOfBilateralAgreement,
    saveOrganizationInfo,
    AddSendingInstitutionInfo,
    AddReceivingInstitutionInfo,
    AddOrganizationInfoToBilateralAgreement,

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
