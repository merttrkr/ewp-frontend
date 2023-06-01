import { Commitment } from '@/models/commitment';
import { ContactResponse, Contact } from '@/models/contactResponse';

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
    const contactList: ContactResponse = { Contacts: fetchedContacts };

    console.log('result: ', contactList);
    return contactList;
  };

  // Add any additional functions or state variables related to the hook here

  return {
    GetContactInfoByHeiID,
  };
};

export default useAgreement;
