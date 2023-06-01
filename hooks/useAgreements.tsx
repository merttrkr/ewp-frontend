import { Commitment } from "@/models/commitment";
import { ContactResponse } from "@/models/contactResponse";

const useAgreement = () => {
    const GetContactInfoByHeiID = async (request: string): Promise<ContactResponse> => {

        let response = await fetch(request, {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        let result: ContactResponse = await response.json();

        return result;
    };

    // Add any additional functions or state variables related to the hook here

    return {
        GetContactInfoByHeiID,
    };
};

export default useAgreement;
