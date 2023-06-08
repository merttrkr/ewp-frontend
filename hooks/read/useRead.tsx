import { AcademicYearInfo } from '@/models/response/academicYearResponse';
import { CollaborationConditionType } from '@/models/response/collaborationConditionTypeResponse';
import { ContactResponse, Contact } from '@/models/response/contactResponse';
import {
  DepartmentResponse,
  Department,
} from '@/models/response/departmentResponse';
import { EducationTypeAndLevel } from '@/models/response/educationTypeAndLevelResponse';
import {
  InstitutionInfo,
  InstitutionInfoResponse,
} from '@/models/response/institutionInfoResponse';
import { LanguageLevel } from '@/models/response/languageLevelResponse';
import { Language } from '@/models/response/languageResponse';
import { OrganizationInfo } from '@/models/response/organizationInfoResponse';
import { SubjectArea } from '@/models/response/subjectAreaResponse';

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
  const makeRequestText = async <T,>(request: string): Promise<T> => {
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
  //institutionInformationForm

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

  //institiutionConditionsForm

  //https:localhost:5001/spGetCollaborationConditionTypes
  const GetCollaborationConditionTypes = async (
    request: string
  ): Promise<CollaborationConditionType[]> => {
    const condition: CollaborationConditionType[] = await makeRequest<
      CollaborationConditionType[]
    >(request);
    return condition;
  };

  //https://localhost:5001/spGetLanguages
  const GetLanguages = async (request: string): Promise<Language[]> => {
    const languages: Language[] = await makeRequest<Language[]>(request);
    return languages;
  };

  //https://localhost:5001/spGetLanguageLevels
  const GetLanguageLevels = async (
    request: string
  ): Promise<LanguageLevel[]> => {
    const languageLevels: LanguageLevel[] = await makeRequest<LanguageLevel[]>(
      request
    );
    return languageLevels;
  };
  //https://localhost:5001/spGetSubjectAreas
  const GetSubjectAreas = async (request: string): Promise<SubjectArea[]> => {
    const subjectAreas: SubjectArea[] = await makeRequest<SubjectArea[]>(
      request
    );
    return subjectAreas;
  };
  //https://localhost:5001/spGetEducationTypesAndLevels
  const GetEducationTypesAndLevels = async (
    request: string
  ): Promise<EducationTypeAndLevel[]> => {
    const educationTypesAndLevels: EducationTypeAndLevel[] = await makeRequest<
      EducationTypeAndLevel[]
    >(request);
    return educationTypesAndLevels;
  };
  //https://localhost:5001/spGetAcademicYearInfo
  const GetAcademicYearInfo = async (
    request: string
  ): Promise<AcademicYearInfo[]> => {
    const academicYearInfo: AcademicYearInfo[] = await makeRequest<
      AcademicYearInfo[]
    >(request);
    return academicYearInfo;
  };

  //https://localhost:5001/spGetSelectedContactInfoOfOrganizationInfo?organizationInfo_id=21
  const GetSelectedContactInfoOfOrganizationInfo = async (
    request: string
  ): Promise<string[]> => {
    const contactInfo: string[] = await makeRequest<string[]>(request);
    return contactInfo;
  };

  //https://localhost:5001/spGetOrganizationInfo2?organizationInfo_id=21
  const GetOrganizationInfo = async (
    request: string
  ): Promise<OrganizationInfo> => {
    const organizationInfo: OrganizationInfo =
      await makeRequest<OrganizationInfo>(request);
    return organizationInfo;
  };

  //https://localhost:5001/spCheckIfBilateralAgreementIsInEffect?bilateralAgreement_id=2
  const CheckIfBilateralAgreementIsInEffect = async (
    request: string
    ): Promise<string> => {
      
      const result: string = await makeRequestText<string>(request);

      
      return result;
    };
  return {
    CheckIfBilateralAgreementIsInEffect,
    GetContactInfoByHeiID,
    GetAllUniversitiesInfo,
    GetDepartmentsByHeiID,
    GetCollaborationConditionTypes,
    GetLanguages,
    GetLanguageLevels,
    GetSubjectAreas,
    GetEducationTypesAndLevels,
    GetAcademicYearInfo,
    GetSelectedContactInfoOfOrganizationInfo,
    GetOrganizationInfo,
  };
};

export default useAgreement;
