import { writable } from "svelte/store";
import { type Application, type Entry, type Material, type Staff } from "../types";

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
