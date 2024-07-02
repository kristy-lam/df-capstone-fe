const SuccessDiv = ({ successMsg }) => {
  return (
    <div className="success-text mt-2" data-testid="success-div">
      {successMsg}
    </div>
  );
};

export default SuccessDiv;
