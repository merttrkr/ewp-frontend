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
  //https://localhost:5001/spRemoveSelectedCourseById?selectedCourse_id=12
  const RemoveSelectedCourseById = async (request: string): Promise<void> => {
    await makeRequest<string>(request);
  };
  //https://localhost:5001/spDeleteRowFromVirtualComponent?virtualComponent_id=81
  const DeleteRowFromVirtualComponent = async (
    request: string
  ): Promise<void> => {
    await makeRequest<string>(request);
  };
  return { RemoveSelectedCourseById, DeleteRowFromVirtualComponent };
};

export default useDelete;
