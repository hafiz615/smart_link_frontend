"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/auth/authThunk";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import { Container, FormContainer, Title, Form, LinkContainer } from "./styles";
import Link from "next/link";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useAuth();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setFieldErrors({});
      await dispatch(loginUser(formData)).unwrap();
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setFieldErrors(errors);
      } else {
        toast.error(err || "Login failed. Please try again.");
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <div>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {fieldErrors.email && (
              <ErrorMessage>{fieldErrors.email}</ErrorMessage>
            )}
          </div>

          <div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {fieldErrors.password && (
              <ErrorMessage>{fieldErrors.password}</ErrorMessage>
            )}
          </div>

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Form>
        <LinkContainer>
          <p>
            Don't have an account? <Link href="/signup">Sign up</Link>
          </p>
        </LinkContainer>
      </FormContainer>
    </Container>
  );
}
