import { writable } from "svelte/store";
import { type Application, type Entry, type Material, type Staff } from "../types";
import { material_options, staff_options } from "./constants";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api';

export let application = writable({} as Application);
export let loggedin = writable(false);
export let terms = writable(false);
export const cost_map = writable(new Map<Entry, { staff: number, material: number}>())

export async function getSchoolInfo(schoolNumber: string) {
    const response = await fetch(`${BACKEND_URL}/school/${schoolNumber}`)
    if(!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

export function validateApplication(data: Application) {
    if(!data.school?.id) {
        throw new Error("Bitte eine Schulnummer angeben")
    }

    if(!data.principal?.name || !data.principal?.email) {
        throw new Error("Bitte den Namen und die E-Mail-Adresse der Schulleitung angeben")
    }

    if(!data.entries || data.entries.length === 0) {
        throw new Error("Mindestens ein Eintrag ist erforderlich")
    }

    for(let entry of data.entries) {
        if(!entry.year) {
            throw new Error("Bitte ein Jahr angeben")
        }
        if(!entry.type) {
            throw new Error("Bitte einen Eintragstyp angeben")
        }
        if(!entry.grades) {
            throw new Error("Bitte eine Jahrgangsstufe angeben")
        }
        if(!entry.subjects) {
            throw new Error("Bitte ein Fach angeben")
        }
        if(!entry.students) {
            throw new Error("Bitte die Anzahl der Schüler angeben")
        }
        for(let staff of entry.staff) {
            if(!staff.type) {
                throw new Error("Bitte einen Personaltyp angeben")
            }
        }
        for(let material of entry.material) {
            if(!material.type) {
                throw new Error("Bitte einen Sachkostentyp angeben")
            }
        }
    }
}

export async function submitFormData(data: object): Promise<Blob> {
    const response = await fetch(`${BACKEND_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if(!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.blob()
}

export async function downloadBlob(blob: Blob): Promise<void> {
    let pwa = window.open(window.URL.createObjectURL(blob));
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
}
