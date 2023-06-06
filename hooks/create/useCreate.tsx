import { IdForBothCollaborationConditionResponse } from '@/models/idForBothCollaborationConditionResponse';
import { IdForBothResponse } from '@/models/idForBothResponse';

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

    console.log('result IIA-ID: ', IIAID);
    return IIAID;
  };

  //https://localhost:5001/spGenerateIIACode
  const GenerateIIACode = async (request: string): Promise<string> => {
    const IIACode: string = await makeRequestString<string>(request);

    console.log('result IIACode: ', IIACode);
    return IIACode;
  };

  //https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization
  const GenerateIdsForBothOrganizationAndPartnerOrganization = async (
    request: string
  ): Promise<IdForBothResponse> => {
    const idForBoth: IdForBothResponse =
      await makeRequestJSON<IdForBothResponse>(request);
    console.log('IdForBothResponse ', idForBoth);
    return idForBoth;
  };

  //https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition
  const GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition =
    async (
      request: string
    ): Promise<IdForBothCollaborationConditionResponse> => {
      const idForBothCollaborationConditionResponse: IdForBothCollaborationConditionResponse =
        await makeRequestJSON<IdForBothCollaborationConditionResponse>(request);
      console.log(
        'IdForBothCollaborationConditionResponse ',
        idForBothCollaborationConditionResponse
      );
      return idForBothCollaborationConditionResponse;
    };

  return {
    GenerateBilateralAgreementID,
    GenerateIIAID,
    GenerateIIACode,
    GenerateIdsForBothOrganizationAndPartnerOrganization,
    GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition,
  };
};

export default useCreate;
