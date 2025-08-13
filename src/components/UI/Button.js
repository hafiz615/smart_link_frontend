import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => {
    if (props.variant === "primary")
      return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    if (props.variant === "danger") return "#dc3545";
    if (props.variant === "success") return "#28a745";
    return "#6c757d";
  }};
  color: white;
  border: none;
  padding: ${(props) =>
    props.size === "small" ? "0.25rem 0.5rem" : "0.75rem 1.5rem"};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${(props) => (props.size === "small" ? "0.8rem" : "1rem")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
