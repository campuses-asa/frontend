import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStudent, fetchAllCampuses } from "../api";
import type { Student } from "../types";
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  gpa?: string;
}

// regular expression for validating email format
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AddStudentPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState("");
  const [campusId, setCampusId] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { data: campuses } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchAllCampuses,
  });

  // tanstack query write handling
  const addMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: (newStudent) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate(`/students/${newStudent.id}`);
    },
  });

  // input validation
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!gpa.trim()) {
      newErrors.gpa = "GPA is required.";
    } else {
      const gpaValue = parseFloat(gpa);
      if (Number.isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
        newErrors.gpa = "GPA must be a number between 0.0 and 4.0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    addMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      imageUrl: imageUrl.trim() || undefined,
      gpa: parseFloat(gpa),
      campusId: campusId ? parseInt(campusId, 10) : undefined,
    } as Student);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-pink-200 dark:from-slate-900 dark:via-purple-950 dark:to-pink-950 p-8 flex items-center gap-8">
          {/* Icon */}
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 shadow flex items-center justify-center flex-shrink-0">
            <svg
              className="w-10 h-10 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Add{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Student
              </span>
            </h1>

            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              Create a new student profile and add their details
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-8 space-y-6"
        >
          {/* Submission Error Banner */}
          {addMutation.isError && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-400">
                {addMutation.error instanceof Error
                  ? addMutation.error.message
                  : "Something went wrong while creating the student."}
              </p>
            </div>
          )}

          {/* First & Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
              >
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.firstName
                    ? "border-red-400 dark:border-red-700"
                    : "border-slate-300 dark:border-slate-700"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
              >
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.lastName
                    ? "border-red-400 dark:border-red-700"
                    : "border-slate-300 dark:border-slate-700"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.email
                  ? "border-red-400 dark:border-red-700"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Image URL{" "}
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                (Optional)
              </span>
            </label>

            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Leave blank to use a generated placeholder image.
            </p>
          </div>

          {/* GPA */}
          <div>
            <label
              htmlFor="gpa"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              GPA <span className="text-red-500">*</span>
            </label>

            <input
              id="gpa"
              type="number"
              min="0"
              max="4"
              step="0.1"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="Enter GPA (0.0 - 4.0)"
              className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.gpa
                  ? "border-red-400 dark:border-red-700"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {errors.gpa && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.gpa}
              </p>
            )}
          </div>

          {/* Campus */}
          <div>
            <label
              htmlFor="campusId"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Campus{" "}
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                (Optional)
              </span>
            </label>

            <select
              id="campusId"
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Not enrolled</option>
              {campuses?.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Leave as "Not enrolled" if the student isn't attending a campus
              yet.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addMutation.isPending ? "Creating..." : "Create Student"}
          </button>
        </form>
      </div>
    </div>
  );
}
