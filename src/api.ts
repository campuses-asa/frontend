import { type Student, type Campus} from './types.ts';

// CURRENTLY USING LOCALLY HOSTED SERVER
const API_URL = "http://localhost:3666";

// Student stuff
export async function fetchAllStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) throw new Error(`Failed to retrieve student list (HTTP ${response.status})`);

  const rawData = await response.json();
  // Convert gpa string to number
  return rawData.map((student: any) => ({
    ...student,
    gpa: student.gpa ? Number(student.gpa) : 0 // Converts "3.8" to 3.8
  })) as Student[];
}

export async function fetchStudentById(id: number): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${id}`);
  if (!response.ok) throw new Error(`Failed to retrieve student with id ${id}, (HTTP ${response.status})`);

  const rawData = await response.json();
  // Convert gpa string to number
  return {
    ...rawData,
    gpa: rawData.gpa ? Number(rawData.gpa) : 0
  } as Student; 
}

export async function addStudent(newStudent: Student): Promise<Student> {
  const response = await fetch(`${API_URL}/students/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent)
  });
  if (!response.ok) throw new Error("Failed to add Student");
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
  const response = await fetch(`${API_URL}/students/${studentId}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Failed to delete student");
}

// Campus stuff
export async function fetchAllCampuses(): Promise<Campus[]> {
  const response = await fetch(`${API_URL}/campuses`);
  if (!response.ok) throw new Error(`Failed to retrieve campus list (HTTP ${response.status})`);
  return response.json();
}

export async function fetchCampusById(id:number): Promise<Campus> {
  const response = await fetch(`${API_URL}/campuses/${id}`);
  if (!response.ok) throw new Error(`Failed to retrieve campus with id ${id} (HTTP ${response.status})`);
  return response.json();
}

export async function addCampus(newCampus: Campus): Promise<Campus> {
  const response = await fetch(`${API_URL}/campuses/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCampus)
  })
  if (!response.ok) throw new Error(`Failed to add Campus`);
  return response.json();
}

export async function editCampusProfile(updatedCampus: Campus): Promise<Campus> {
  const response = await fetch(`${API_URL}/campuses/${updatedCampus.id}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCampus)
  });
  if (!response.ok) throw new Error(`Failed to update Campus Profile.`);
  return response.json();
}

export async function deleteCampus(campusId: number): Promise<void> {
  const response = await fetch(`${API_URL}/campuses/${campusId}`,{
    method: "DELETE"
  });
  if (!response.ok) throw new Error(`Failed to delete Campus.`);
}
