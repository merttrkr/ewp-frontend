
const useDelete = () => {
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

  return {

  };
};

export default useDelete;
