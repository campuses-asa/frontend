export interface Campus {
    id: number;
    name: string;
    address: string;
    imageUrl?: string;
    description: string;
}

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string;
    gpa: number;
    campusId?: number;
}