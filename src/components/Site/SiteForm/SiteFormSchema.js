import * as Yup from "yup";

export const categories = [
  "Technology",
  "Design",
  "News",
  "Education",
  "Entertainment",
  "Business",
  "Health",
  "Sports",
];

export const siteSchema = Yup.object().shape({
  siteUrl: Yup.string()
    .url("Please provide a valid URL")
    .required("Site URL is required"),
  title: Yup.string()
    .trim()
    .min(1, "Title must be between 1 and 255 characters")
    .max(255, "Title must be between 1 and 255 characters")
    .required("Title is required"),
  description: Yup.string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),
  category: Yup.string()
    .trim()
    .min(1, "Category must be between 1 and 100 characters")
    .max(100, "Category must be between 1 and 100 characters")
    .required("Category is required"),
  coverImage: Yup.string()
    .trim()
    .test("is-url-or-localhost", "Cover image must be a valid URL", (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .notRequired(),
});
