"use client";
import useSignup from "./useSignUp";
import SignupForm from "./SignupForm";
import { Container, FormContainer, Title } from "./styles";

export default function SignupContainer() {
  const {
    formData,
    fieldErrors,
    serverError,
    isSubmitting,
    handleInputChange,
    handleBlur,
    handleSubmit,
    error,
  } = useSignup();

  return (
    <Container>
      <FormContainer>
        <Title>Create Account</Title>
        <SignupForm
          formData={formData}
          fieldErrors={fieldErrors}
          serverError={serverError || error}
          isSubmitting={isSubmitting}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />
      </FormContainer>
    </Container>
  );
}
