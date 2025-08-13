import styled from "styled-components";

const StyledError = styled.div`
  color: #b71c1c;
  background-color: #fdecea;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorMessage = ({ children }) => {
  if (!children) return null;
  return <StyledError>{children}</StyledError>;
};

export default ErrorMessage;
