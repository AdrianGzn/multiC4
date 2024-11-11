import { Role } from "./role";

export interface Employee {
    id_employee: string;
    name: string;
    lastName: string;
    role: Role;
    email: string;
    phone: string;
    address: string;
}
  