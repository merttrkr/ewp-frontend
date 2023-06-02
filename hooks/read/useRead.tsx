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

    return response.json() as Promise<T>;
  };

  const GetContactInfoByHeiID = async (
    request: string
  ): Promise<ContactResponse> => {
    const fetchedContacts: Contact[] = await makeRequest<Contact[]>(request);
    const contactList: ContactResponse = { contacts: fetchedContacts };

    return contactList;
  };

  //https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all
  const GetAllUniversitiesInfo = async (
    request: string
  ): Promise<InstitutionInfoResponse> => {
    const fetchedInstitutionInfos: InstitutionInfo[] = await makeRequest<
      InstitutionInfo[]
    >(request);
    const InstitutionInfoList: InstitutionInfoResponse = {
      institutionInfos: fetchedInstitutionInfos,
    };

    return InstitutionInfoList;
  };

  //https://localhost:5001/spGetOrganizationalUnitNamesForOrganization?heiId=iyte.edu.tr
  const GetDepartmentsByHeiID = async (
    request: string
  ): Promise<DepartmentResponse> => {
    const fetchedDepartments: Department[] = await makeRequest<Department[]>(
      request
    );
    const departmentList: DepartmentResponse = {
      departments: fetchedDepartments,
    };

    return departmentList;
  };

  return {
    GetContactInfoByHeiID,
    GetAllUniversitiesInfo,
    GetDepartmentsByHeiID,
  };
};

export default useAgreement;
