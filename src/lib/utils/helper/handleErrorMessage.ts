export const handleErrorMessage = <T>(
  error: Error,
  setErrorState: React.Dispatch<React.SetStateAction<T>>,
) => {
  const errorList = error.message.match(/{.*}/g);
  if (errorList && errorList.length !== 0) {
    setErrorState(JSON.parse(errorList[0]));
  }
};
