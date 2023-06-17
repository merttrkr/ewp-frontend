import { IdForBothCollaborationConditionResponse } from '@/models/response/idForBothCollaborationConditionResponse';
import { IdForBothResponse } from '@/models/response/idForBothResponse';

const useCreate = () => {
  const makeRequestString = async <T,>(request: string): Promise<T> => {
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

  const makeRequestJSON = async <T,>(request: string): Promise<T> => {
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

  //https://localhost:5001/spGenerateBilateralAgreementId
  const GenerateBilateralAgreementID = async (
    request: string
  ): Promise<number> => {
    return makeRequestString<number>(request);
  };

  //https://localhost:5001/spGenerateIIAId
  const GenerateIIAID = async (request: string): Promise<string> => {
    const IIAID: string = await makeRequestString<string>(request);
    return IIAID;
  };

  //https://localhost:5001/spGenerateIIACode
  const GenerateIIACode = async (request: string): Promise<string> => {
    const IIACode: string = await makeRequestString<string>(request);
    return IIACode;
  };

  //https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization
  const GenerateIdsForBothOrganizationAndPartnerOrganization = async (
    request: string
  ): Promise<IdForBothResponse[]> => {
    const idForBoth: IdForBothResponse[] = await makeRequestJSON<
      IdForBothResponse[]
    >(request);

    return idForBoth;
  };

  //https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition
  const GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition =
    async (
      request: string
    ): Promise<IdForBothCollaborationConditionResponse[]> => {
      const idForBothCollaborationConditionResponse: IdForBothCollaborationConditionResponse[] =
        await makeRequestJSON<IdForBothCollaborationConditionResponse[]>(
          request
        );

      return idForBothCollaborationConditionResponse;
    };

  //https://localhost:5001/spGenerateOmobilityId
  const GenerateOmobilityId = async (request: string): Promise<string> => {
    const omobilityId: string = await makeRequestString<string>(request);
    return omobilityId;
  };

  // https://localhost:5001/spGenerateNewIdForLearningAgreement
  const GenerateNewIdForLearningAgreement = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  // New function: GenerateNewIdForStudentInfo
  // https://localhost:5001/spGenerateNewIdForStudentInfo
  const GenerateNewIdForStudentInfo = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  // New function: GenerateNewIdForSendingInstitutionInfo
  // https://localhost:5001/spGenerateNewIdForSendingInstitutionInfo
  const GenerateNewIdForSendingInstitutionInfo = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  // New function: GenerateNewIdForReceivingInstitutionInfo
  // https://localhost:5001/spGenerateNewIdForReceivingInstitutionInfo
  const GenerateNewIdForReceivingInstitutionInfo = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  // New function: GenerateNewIdForProposedMobilityProgramme
  // https://localhost:5001/spGenerateNewIdForProposedMobilityProgramme
  const GenerateNewIdForProposedMobilityProgramme = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  // New function: GenerateNewIdForCommitment
  // https://localhost:5001/spGenerateNewIdForCommitment
  const GenerateNewIdForCommitment = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  // New function: GenerateNewIdForVirtualComponent
  // https://localhost:5001/spGenerateNewIdForVirtualComponent
  const GenerateNewIdForVirtualComponent = async (
    request: string
  ): Promise<string> => {
    return makeRequestString<string>(request);
  };

  return {
    GenerateBilateralAgreementID,
    GenerateIIAID,
    GenerateIIACode,
    GenerateIdsForBothOrganizationAndPartnerOrganization,
    GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition,
    GenerateOmobilityId,
    GenerateNewIdForLearningAgreement,
    GenerateNewIdForStudentInfo,
    GenerateNewIdForSendingInstitutionInfo,
    GenerateNewIdForReceivingInstitutionInfo,
    GenerateNewIdForProposedMobilityProgramme,
    GenerateNewIdForCommitment,
    GenerateNewIdForVirtualComponent,
  };
};

export default useCreate;
