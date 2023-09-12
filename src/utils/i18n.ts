import * as translations from '../translations/locales';

import { derived, writable } from 'svelte/store';

export const locale = writable('de_DE');
export const locales: string[] = Object.keys(translations);
export const formater = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR'});

function translate(locale: string, key: string, vars: object): string {
    if(!key) throw new Error('No key provided');
    if(!locale) throw new Error('No locale provided');
    if(!locales.includes(locale)) throw new Error(`Locale ${locale} not found`);

    const data = translations[locale as keyof typeof translations].default;
    let text = data[key as keyof typeof data];

    if(!text) throw new Error(`Key ${key} not found in locale ${locale}`);

    Object.keys(vars).map((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        text = text.replace(regex, vars[key as keyof typeof vars]);
    });

    return text;
}

export const t = derived(locale, ($locale) => (key: string, vars: object = {}) => {
    return translate($locale, key, vars);
});

export const c = (value: number) => formater.format(value);