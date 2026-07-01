import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Campus } from "../types";
import type { FormEvent } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchCampusById, deleteCampus, editCampusProfile } from "../api";

type FormErrors = {
  name?: string;
  address?: string;
  description?: string;
};
export default function EditCampusPage() {
  const { id } = useParams<{ id: string }>();
  const campusId = id ? parseInt(id, 10) : 1;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<FormErrors>({});

  const {
    data: campus,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["campus", campusId],
    queryFn: () => fetchCampusById(campusId),
  });

  const editMutation = useMutation({
    mutationFn: (updatedCampus: Campus) => editCampusProfile(updatedCampus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus", campusId] });
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
      navigate(-1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCampus(campusId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate("/campuses");
    },
  });

  function handleSubmitEdits(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const address = (formData.get("address") as string).trim();
    const description = (formData.get("description") as string).trim();
    const imageUrl = (formData.get("imageUrl") as string).trim();

    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Campus name is required.";
    if (!address) newErrors.address = "Campus address is required.";
    if (!description) newErrors.description = "Description is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedCampus: Campus = {
      id: campusId,
      name,
      address,
      description,
      imageUrl: imageUrl || undefined,
    };

    editMutation.mutate(updatedCampus);
  }
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Navigation Header */}
      <div>
        <Link
          to={`/campuses/${campusId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Campus Details</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Edit{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Campus Details
          </span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Update the name, address, description, and image for this campus.
        </p>
      </div>

      {/* Content Area: Loading / Error / Form Views */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-pulse">
          {/* Image Preview Skeleton */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-inner flex-shrink-0" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32" />
          </div>

          {/* Input Fields Skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20" />
            <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24" />
            <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-28" />
            <div className="h-24 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-28" />
            <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full sm:w-32" />
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full sm:w-24" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full sm:w-32" />
            </div>
          </div>
        </div>
      ) : isError ? (
        (() => {
          const is404 = error instanceof Error && error.message.includes("404");

          if (is404) {
            return (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Campus Not Found
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    It may have been deleted or the link may be outdated.
                  </p>
                </div>

                <Link
                  to="/campuses"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Return to Campus Directory
                </Link>
              </div>
            );
          }

          return (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl shadow-inner relative">
                <div className="absolute inset-0 bg-red-500/20 dark:bg-red-400/20 rounded-2xl blur-lg animate-pulse" />
                <svg
                  className="w-10 h-10 relative z-10"
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
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Unable to load campus details
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  {error instanceof Error
                    ? error.message
                    : "An unexpected server error occurred while retrieving campus information."}
                </p>
              </div>

              <button
                onClick={() => refetch()}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.21"
                  />
                </svg>
                Retry Connection
              </button>
            </div>
          );
        })()
      ) : campus ? (
        <form
          onSubmit={handleSubmitEdits}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-200"
        >
          {/* Campus Image Preview */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner border border-slate-200/50 dark:border-slate-800/60 flex-shrink-0">
              {campus.imageUrl ? (
                <img
                  src={campus.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${campus.name}`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400">
                  <svg
                    className="w-10 h-10 opacity-60"
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
              )}
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Campus Image Preview
            </span>
          </div>

          {/* Campus Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Campus Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={campus.name}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
              required
            />
            {errors.name && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="address"
              className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={campus.address}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
              required
            />
            {errors.address && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.address}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={campus.description}
              rows={4}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white resize-none"
              required
            />
            {errors.description && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          {/* Campus Image URL */}
          <div className="space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Campus Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              defaultValue={campus.imageUrl || ""}
              placeholder="https://example.com/campus.jpg"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl transition-colors duration-150 order-last sm:order-first"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Campus"}
            </button>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/campuses/${campus.id}`}
                className="w-full sm:w-auto px-5 py-2.5 text-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-150"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-sm font-semibold text-white rounded-xl shadow-sm transition-colors duration-150"
                disabled={editMutation.isPending}
              >
                {editMutation.isPending ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}
