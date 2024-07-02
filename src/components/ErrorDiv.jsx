const ErrorDiv = ({ errorMsg }) => {
  return (
    <div className="error-text mt-2" data-testid="error-div">
      {errorMsg}
    </div>
  );
};

export default ErrorDiv;
