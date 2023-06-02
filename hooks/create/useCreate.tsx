

const useCreate = () => {

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

    //https://localhost:5001/spGenerateBilateralAgreementId
    const GenerateBilateralAgreementID = async (
        request: string
    ): Promise<number> => {
        return makeRequest<number>(request);
    };

    //https://localhost:5001/spGenerateIIAId
    const GenerateIIAID = async (request: string): Promise<string> => {
        const IIAID: string = await makeRequest<string>(request);

        console.log('result IIA-ID: ', IIAID);
        return IIAID;
    };

    //https://localhost:5001/spGenerateIIACode
    const GenerateIIACode = async (request: string): Promise<string> => {
        const IIACode: string = await makeRequest<string>(request);

        console.log('result IIACode: ', IIACode);
        return IIACode;
    };


    return {
        GenerateBilateralAgreementID,
        GenerateIIAID,
        GenerateIIACode,

    };
};

export default useCreate;
