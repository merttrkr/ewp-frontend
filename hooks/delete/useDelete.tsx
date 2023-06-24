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

    return response.text() as Promise<T>;
  };
  //https://localhost:5001/spRemoveSelectedCourseById?selectedCourse_id=12
  const RemoveSelectedCourseById = async (request: string): Promise<void> => {
    await makeRequest<string>(request);
  };
  //https://localhost:5001/spRemoveVirtualCoursesById?virtualCourse_id=56
  const RemoveVirtualCourseById = async (request: string): Promise<void> => {
    await makeRequest<string>(request);
  };
  return { RemoveSelectedCourseById, RemoveVirtualCourseById };
};

export default useDelete;
