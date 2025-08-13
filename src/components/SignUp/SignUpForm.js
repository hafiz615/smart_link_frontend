import { Form, FormGroup, PasswordRequirements, LinkContainer } from "./styles";
import { Input, Select } from "../UI/Input";
import { Button } from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import Link from "next/link";

export default function SignupForm({
  formData,
  fieldErrors,
  serverError,
  isSubmitting,
  onChange,
  onBlur,
  onSubmit,
}) {
  return (
    <Form onSubmit={onSubmit} noValidate>
      <FormGroup>
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {fieldErrors.username && (
          <ErrorMessage>{fieldErrors.username}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {fieldErrors.email && <ErrorMessage>{fieldErrors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {!fieldErrors.password && !formData.password && (
          <PasswordRequirements>
            Password must contain at least 6 characters, uppercase, lowercase,
            and a number.
          </PasswordRequirements>
        )}
        {fieldErrors.password && (
          <ErrorMessage>{fieldErrors.password}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Select name="role" value={formData.role} onChange={onChange} required>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
        {fieldErrors.role && <ErrorMessage>{fieldErrors.role}</ErrorMessage>}
      </FormGroup>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <LinkContainer>
        <p>
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </LinkContainer>
    </Form>
  );
}
