import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCampus } from "../api";
import type { Campus } from "../types";

interface FormErrors {
  name?: string;
  address?: string;
  description?: string;
}

export default function AddCampusPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  // mutation that posts a new campus to the server
  // on success, invalidates the cached campus list so it refetches,
  // then navigates the user to the new campus's detail page
  const addMutation = useMutation({
    mutationFn: addCampus,
    onSuccess: (newCampus) => {
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
      navigate(`/campuses/${newCampus.id}`);
    },
  });

  // checks the required fields (name, address, description) and
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Campus name is required.";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    // imageUrl is optional, so fall back to undefined if left blank
    // the server is expected to apply a default image in that case
    addMutation.mutate({
      name: name.trim(),
      address: address.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || undefined,
    } as Campus);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-purple-200 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 p-10 flex items-center gap-8">
          {/* Icon */}
          <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 shadow flex items-center justify-center">
            <svg
              className="w-12 h-12 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
              Add{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Campus
              </span>
            </h1>

            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              Create a new campus location and add its details
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-10 space-y-7"
        >
          {/* shows a banner only if the mutation itself failed (e.g. network or server error) */}
          {/* separate from the per-field validation errors below */}
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
                  : "Something went wrong while creating the campus."}
              </p>
            </div>
          )}

          {/* Campus Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Campus Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter campus name"
              className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name
                  ? "border-red-400 dark:border-red-700"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Address <span className="text-red-500">*</span>
            </label>

            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter campus address"
              className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.address
                  ? "border-red-400 dark:border-red-700"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {errors.address && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.address}
              </p>
            )}
          </div>

          {/* Image */}
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
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Leave blank to use a generated placeholder image.
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the campus"
              className={`w-full rounded-xl border bg-white dark:bg-slate-950 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.description
                  ? "border-red-400 dark:border-red-700"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          {/* button is disabled while the mutation is in flight, to prevent double submits */}
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold text-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addMutation.isPending ? "Creating..." : "Create Campus"}
          </button>
        </form>
      </div>
    </div>
  );
}
