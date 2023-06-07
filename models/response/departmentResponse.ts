export interface Department {
    id: number;
    organizationalUnitName: string;
}
export interface DepartmentResponse {
    departments?: Department[];
}