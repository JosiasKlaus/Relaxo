import type { Entry } from "../types";
import { application } from "./service";
import { staff_options } from "./constants";

export const currencyFormater = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});

export function calculateStaffCount(entry: Entry): number {
    return entry.staff.filter(staff => staff.type != staff_options[4]).length;
}

export function calculateStaffCost(entry: Entry): number {
    return entry.staff.reduce((acc, staff) => acc + (staff.cost || 0), 0);
}

export function calculateMaterialCost(entry: Entry): number {
    return entry.material.reduce((acc, material) => acc + (material.cost || 0), 0);
}
