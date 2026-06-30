import { type Student } from './types.ts';

// TEMPLATE TANSTACK QUERY FLOW BELOW
const API_URL = "http://localhost:3666";

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) throw new Error(`Failed to retrieve student list (HTTP ${response.status})`);
  return response.json();
}