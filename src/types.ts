export type School = {
    id?: string;
    type?: string;
    supervisor?: string;
    legal?: string;
    name?: string;
    street?: string;
    zipcode?: string;
    city?: string;
    email?: string;
    phone?: string;
}

export type Staff = {
    type?: string;
    hours?: number;
    cost?: number,
    percentage?: number,
    months?: string[]
}

export type Material = {
    type?: string;
    cost?: number;
}

export type Entry = {
    year?: string;
    type?: string;
    grades?: string;
    subjects?: string;
    students?: number;
    staff: Staff[];
    staff_count?: number;
    material: Material[];
    summary: Summary;
}

export type Principal = {
    name?: string;
    email?: string;
}

export type Application = {
    school?: School;
    principal?: Principal;
    entries?: Entry[];
}

export type Summary = {
    year?: string;
    staff?: number;
    material?: number;
}
