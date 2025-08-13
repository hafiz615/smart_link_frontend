"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { siteSchema, categories } from "./SiteFormSchema";
import {
  FormContainer,
  ButtonRow,
  FormGroup,
  Label,
  ErrorMessage,
} from "./styles";
import {
  fetchSites,
  updateSite,
  generateDescription,
  createSite,
} from "@/redux/sites/sitesThunk";
import { Button } from "../../UI/Button";
import { Input, TextArea, Select } from "../../UI/Input";
import { useSites } from "../../../hooks/useSites";

const SiteForm = ({ site, onClose }) => {
  const dispatch = useDispatch();
  const { generatingDescription, searchTerm, selectedCategory } = useSites();

  const [formData, setFormData] = useState({
    siteUrl: "",
    title: "",
    coverImage: "",
    description: "",
    category: "",
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (site) {
      setFormData({
        siteUrl: site.siteurl || site.siteUrl || "",
        title: site.title || "",
        coverImage: site.coverImage || "",
        description: site.description || "",
        category: site.category || "",
      });
    }
  }, [site]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      try {
        await siteSchema.fields[name].validate(value);
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      } catch (err) {
        setFieldErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (value.trim()) {
      try {
        await siteSchema.fields[name].validate(value);
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      } catch (err) {
        setFieldErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleGenerateDescription = async () => {
    if (formData.title && formData.category) {
      try {
        const result = await dispatch(
          generateDescription({
            title: formData.title,
            category: formData.category,
          })
        ).unwrap();
        setFormData((prev) => ({ ...prev, description: result }));
        toast.success("Description generated successfully!");
      } catch (err) {
        toast.error("Failed to generate description.");
      }
    } else {
      toast.error("Please fill in title and category first.");
    }
  };

  const validateForm = async () => {
    try {
      await siteSchema.validate(formData, { abortEarly: false });
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((e) => (errors[e.path] = e.message));
        setFieldErrors(errors);
      }
      toast.error("Please fix the form errors and try again.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      let coverImageUrl = formData.coverImage;

      if (coverImageFile) {
        const uploadData = new FormData();
        uploadData.append("coverImage", coverImageFile);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/upload-cover`,
          { method: "POST", body: uploadData }
        );
        if (!res.ok) throw new Error("Cover image upload failed");
        const result = await res.json();
        coverImageUrl = result.url;
      }

      const submitData = {
        ...formData,
        coverImage: coverImageUrl,
        coverimage: coverImageUrl,
      };

      if (site) {
        await dispatch(
          updateSite({ id: site.id, siteData: submitData })
        ).unwrap();
        toast.success("Site updated successfully!");
      } else {
        await dispatch(createSite(submitData)).unwrap();
        toast.success("Site created successfully!");
      }

      dispatch(
        fetchSites({
          search: searchTerm || "",
          category: selectedCategory || "",
        })
      );

      if (onClose) onClose();
    } catch (err) {
      toast.error(
        err.message || `Failed to ${site ? "update" : "create"} site.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h2>{site ? "Edit Site" : "Add New Site"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Site URL */}
        <FormGroup>
          <Label>Website URL</Label>
          <Input
            type="url"
            name="siteUrl"
            value={formData.siteUrl}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {fieldErrors.siteUrl && (
            <ErrorMessage>{fieldErrors.siteUrl}</ErrorMessage>
          )}
        </FormGroup>

        {/* Title */}
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {fieldErrors.title && (
            <ErrorMessage>{fieldErrors.title}</ErrorMessage>
          )}
        </FormGroup>

        {/* Cover Image */}
        <FormGroup>
          <Label>Cover Image (optional)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setCoverImageFile(file);
                setFormData((prev) => ({
                  ...prev,
                  coverImage: URL.createObjectURL(file),
                }));
              }
            }}
            disabled={isSubmitting}
          />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover Preview"
              style={{
                width: "100px",
                marginTop: "0.5rem",
                borderRadius: "4px",
              }}
            />
          )}
        </FormGroup>

        {/* Category */}
        <FormGroup>
          <Label>Category</Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          {fieldErrors.category && (
            <ErrorMessage>{fieldErrors.category}</ErrorMessage>
          )}
        </FormGroup>

        {/* Description */}
        <FormGroup>
          <Label>Description</Label>
          <Button
            type="button"
            variant="success"
            size="small"
            onClick={handleGenerateDescription}
            disabled={
              !formData.title ||
              !formData.category ||
              generatingDescription ||
              isSubmitting
            }
            style={{ marginBottom: "0.5rem" }}
          >
            {generatingDescription
              ? "Generating..."
              : "🤖 Ask AI for Description"}
          </Button>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {fieldErrors.description && (
            <ErrorMessage>{fieldErrors.description}</ErrorMessage>
          )}
        </FormGroup>

        {/* Buttons */}
        <ButtonRow>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? site
                ? "Updating..."
                : "Creating..."
              : site
              ? "Update Site"
              : "Create Site"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default SiteForm;
