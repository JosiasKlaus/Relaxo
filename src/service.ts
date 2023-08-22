import { writable } from "svelte/store";

const BACKEND_URL = 'http://localhost:8080';

export let staff_map = writable(new Map<number, number>());
export let material_map = writable(new Map<number, number>());

export async function getSchoolInfo(schoolNumber: string) {
    const response = await fetch(`${BACKEND_URL}/school/${schoolNumber}`)
    if(!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

export async function submitFormData(formData: FormData): Promise<Blob> {
    console.log(formData);
    const response = await fetch(`${BACKEND_URL}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    });
    if(!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.blob()
}
