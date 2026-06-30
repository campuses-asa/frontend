import { type Student } from './types.ts';

// CURRENTLY USING LOCALLY HOSTED SERVER
const API_URL = "http://localhost:3666";

export async function fetchAllStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) throw new Error(`Failed to retrieve student list (HTTP ${response.status})`);
  return response.json();
}

export async function fetchStudentById(id: number): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${id}`);
  if (!response.ok) throw new Error(`Failed to retrieve student with id ${id}, (HTTP ${response.status})`);
  return response.json();
}

export async function editStudentProfile(updatedStudent: Student): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${updatedStudent.id}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent)
  });
  if (!response.ok) throw new Error("Failed to update Student Profile");
  return response.json();
}

export async function deleteStudent(studentId: number): Promise<void> {
  const response = await fetch(`${API_URL}/students/${studentId}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete student");
}