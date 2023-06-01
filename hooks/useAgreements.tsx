import { Commitment } from '@/models/commitment';
import { ContactResponse, Contact } from '@/models/contactResponse';
import { ReceivingInstitutionInfo, ReceivingInstitutionInfoResponse } from '@/models/institutionInfoResponse';

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

    console.log('result: ', contactList);
    return contactList;
  };

  //https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all
  const GetAllUniversitiesInfo = async (
    request: string
  ): Promise<ReceivingInstitutionInfoResponse> => {
    let response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const fetchedInstitutionInfos: ReceivingInstitutionInfo[] = await response.json();
    const receivingInstitutionInfoList: ReceivingInstitutionInfoResponse = { receivingInstitutionInfos: fetchedInstitutionInfos };

    console.log('result: ', receivingInstitutionInfoList);
    return receivingInstitutionInfoList;
  };

  https://localhost:5001/spGetOrganizationalUnitNamesForOrganization?heiId=iyte.edu.tr
  const GetDepartmentsByHeiID = async (request: string
    ): Promise<ReceivingInstitutionInfoResponse> => {
      let response = await fetch(request, {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const fetchedInstitutionInfos: ReceivingInstitutionInfo[] = await response.json();
      const receivingInstitutionInfoList: ReceivingInstitutionInfoResponse = { receivingInstitutionInfos: fetchedInstitutionInfos };
  
      console.log('result: ', receivingInstitutionInfoList);
      return receivingInstitutionInfoList;
    };

  return {
    GetContactInfoByHeiID,GetAllUniversitiesInfo
  };
};

export default useAgreement;
