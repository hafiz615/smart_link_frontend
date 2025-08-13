import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signupUser } from "@/redux/auth/authThunk";
import { useAuth } from "../../hooks/useAuth";
import { signupSchema } from "./validation";

const useSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, error } = useAuth();

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError(null);
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (!value.trim()) return;
    try {
      await signupSchema.validateAt(name, { [name]: value });
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setFieldErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);
    setServerError(null);
    setFieldErrors({});
    try {
      await signupSchema.validate(formData, { abortEarly: false });
      await dispatch(signupUser(formData)).unwrap();
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((validationError) => {
          errors[validationError.path] = validationError.message;
        });
        setFieldErrors(errors);
        toast.error("Please fix the form errors.");
      } else {
        const errorMessage =
          typeof err === "string" ? err : err?.message || "Signup failed";

        if (errorMessage.toLowerCase().includes("email")) {
          setFieldErrors((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.toLowerCase().includes("username")) {
          setFieldErrors((prev) => ({ ...prev, username: errorMessage }));
        } else {
          setServerError(errorMessage);
        }

        toast.error(errorMessage);
      }
    } finally {
      setIsValidating(false);
    }
  };

  return {
    formData,
    fieldErrors,
    serverError,
    isSubmitting: isLoading || isValidating,
    handleInputChange,
    handleBlur,
    handleSubmit,
    error,
  };
};

export default useSignup;
