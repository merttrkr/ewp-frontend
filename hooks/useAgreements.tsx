import { Commitment } from '@/models/commitment';
import { ContactResponse, Contact } from '@/models/contactResponse';
import { DepartmentResponse, Department } from '@/models/departmentResponse';
import {
  InstitutionInfo,
  InstitutionInfoResponse,
} from '@/models/institutionInfoResponse';

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

    console.log('result: ', InstitutionInfoList);
    return InstitutionInfoList;
  };

  //https://localhost:5001/spGetOrganizationalUnitNamesForOrganization?heiId=iyte.edu.tr
  const GetDepartmentsByHeiID = async (request: string
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
    const departmentList: DepartmentResponse = { departments: fetchedDepartments };

    console.log('result: ', departmentList);
    return departmentList;
  };
  //https://localhost:5001/spGenerateBilateralAgreementId
  const GenerateBilateralAgreementID = async (request: string
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
    const GenerateIIAID = async (request: string
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
        const IIAID: number = await response.json();
        
    
        console.log('result IIA-ID: ', IIAID);
        return IIAID;
      };

      //https://localhost:5001/spGenerateIIACode
      const GenerateIIACode = async (request: string
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
          const IIACode: number = await response.json();
          
      
          console.log('result IIACode: ', IIACode);
          return IIACode;
        };

        //https://localhost:5001/spUpdateLastUpdateDateOfBilateralAgremeent?bilateralAgreement_id=1

        const UpdateDateOfBilateralAgremeent = async (request: string
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
  return {
    GetContactInfoByHeiID,
    GetAllUniversitiesInfo,
    GetDepartmentsByHeiID,
    GenerateBilateralAgreementID,
    GenerateIIAID,
    GenerateIIACode,

  };
};

export default useAgreement;
