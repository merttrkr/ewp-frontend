import { Commitment } from '@/models/commitment';
import { ContactResponse, Contact } from '@/models/contactResponse';
import { DepartmentResponse, Department } from '@/models/departmentResponse';
import {
  ReceivingInstitutionInfoForm,
  SendingInstitutionInfoForm,
} from '@/models/institutionInfoFormResponse';
import {
  InstitutionInfo,
  InstitutionInfoResponse,
} from '@/models/institutionInfoResponse';
import { organizationRequestToIIA } from '@/models/organizationRequestToIIA';

const useAgreement = () => {
  const GetContactInfoByHeiID = async (
    request: string
  ): Promise<ContactResponse> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const fetchedContacts: Contact[] = await response.json();
    const contactList: ContactResponse = { contacts: fetchedContacts };

    return contactList;
  };

  //https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all
  const GetAllUniversitiesInfo = async (
    request: string
  ): Promise<InstitutionInfoResponse> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const fetchedInstitutionInfos: InstitutionInfo[] = await response.json();
    const InstitutionInfoList: InstitutionInfoResponse = {
      institutionInfos: fetchedInstitutionInfos,
    };

    return InstitutionInfoList;
  };

  //https://localhost:5001/spGetOrganizationalUnitNamesForOrganization?heiId=iyte.edu.tr
  const GetDepartmentsByHeiID = async (
    request: string
  ): Promise<DepartmentResponse> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const fetchedDepartments: Department[] = await response.json();
    const departmentList: DepartmentResponse = {
      departments: fetchedDepartments,
    };

    return departmentList;
  };
  //https://localhost:5001/spGenerateBilateralAgreementId
  const GenerateBilateralAgreementID = async (
    request: string
  ): Promise<Number> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const bilateralAgreementID: number = await response.json();

    console.log('result bilateralAgreementID: ', bilateralAgreementID);
    return bilateralAgreementID;
  };

  //https://localhost:5001/spGenerateIIAId
  const GenerateIIAID = async (request: string): Promise<string> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const IIAID: string = await response.text();

    console.log('result IIA-ID: ', IIAID);
    return IIAID;
  };

  //https://localhost:5001/spGenerateIIACode
  const GenerateIIACode = async (request: string): Promise<string> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const IIACode: string = await response.text();

    console.log('result IIACode: ', IIACode);
    return IIACode;
  };

  //https://localhost:5001/spUpdateLastUpdateDateOfBilateralAgremeent?bilateralAgreement_id=1

  const UpdateDateOfBilateralAgremeent = async (
    request: string
  ): Promise<String> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const IIACode: String = await response.json();

    console.log('result IIACode: ', IIACode);
    return IIACode;
  };
  //https://localhost:5001/spAddOrganizationInfoToBilateralAgreement?organizationInfo_id=1&bilateralAgreement_id=2&isPartner=0'
  const AddOrganizationInfoToBilateralAgreement = async (
    request: organizationRequestToIIA
  ): Promise<number> => {
    const { organizationInfoId, isPartner, bilateralAgreementId } = request;

    const url = `https://localhost:5001/spAddOrganizationInfoToBilateralAgreement?organizationInfo_id=${organizationInfoId}&bilateralAgreement_id=${bilateralAgreementId}&isPartner=${isPartner}`;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result: number = await response.json();

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

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result: number = await response.json();

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

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result: number = await response.json();

    console.log('result sendingInstitutionInfo_id:', result);
    return result;
  };

  return {
    GetContactInfoByHeiID,
    GetAllUniversitiesInfo,
    GetDepartmentsByHeiID,
    GenerateBilateralAgreementID,
    GenerateIIAID,
    GenerateIIACode,
    AddOrganizationInfoToBilateralAgreement,
    UpdateDateOfBilateralAgremeent,
    AddSendingInstitutionInfo,
    AddReceivingInstitutionInfo,
  };
};

export default useAgreement;
