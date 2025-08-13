import styled from "styled-components";

export const Container = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 2rem;
`;

export const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export const PasswordRequirements = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
  line-height: 1.4;
`;
