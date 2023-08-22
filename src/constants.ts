/* Data models / types */
export type School = {
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
    prefix?: string;
    type?: string;
    hours?: number;
    cost?: number,
    percentage?: number,
    months?: string[]
}

export type Material = {
    prefix?: string;
    type?: string;
    cost?: number;
}

/* Predefined select options */
export const type_options = [
    "Zusätzliche Förderkurse",
    "Eine individuelle Lernbegleitung im Unterricht",
    "Unterricht in einem über die Stundentafel hinausgehenden Umfang",
    "Eine Hausaufgabenbetreuung",
    "Eine organisierte (Online-) Nachhilfe",
    'Eine zweiteilige Teilung von Lerngruppen (sog. "Doppelstreckung")',
    "Kulturelle Angebote",
    "Gelegenheiten zur körperlichen Bewegung",
    "Sozialpädagogische und psychologische Unterstützung",
];

export const staff_options = [
    "kein Personal",
    "Mehrarbeit Teilz. BEA gehob. Dienst",
    "Mehrarbeit Teilz. BEA höh. Dienst",
    "Mehrarb./ÜSt. Teilz. TV-H",
    "Beschäftigung Befristeter TV-H Kräfte",
];

export const material_options = [
    "keine Sachmittel",
    "Lernmittel (z.B. Lizenzen)",
    "Dienstleistungsvertrag",
    "Material bis 410 Euro netto",
    "Sachaustattungsgegenstände über 410 Euro netto (10.000 Euro-Erlass)",
    "Fahrtkosten und Eintrittsgelder"
];

export const grade_options = [
    "Jahrgangsstufe 1",
    "Jahrgangsstufe 2",
    "Jahrgangsstufe 3",
    "Jahrgangsstufe 4",
    "Jahrgangsstufe 5",
    "Jahrgangsstufe 6",
    "Jahrgangsstufe 7",
    "Jahrgangsstufe 8",
    "Jahrgangsstufe 9",
    "Jahrgangsstufe 10",
    "E-Phase",
    "Q1/2",
    "Q3/4",
];

export const subject_options = [
    "Deutsch",
    "Englisch",
    "Mathematik",
    "Französisch",
    "Spanisch",
    "Sport",
    "Religion/Ethik",
    "Musik",
    "Kunst",
    "Biologie",
    "Chemie",
    "Physik",
    "Erdkunde",
    "Politik und Wirtschaft",
    "Geschichte",
];

export const staff_time_options = [
    { label: "September 2023", value: "September 2023"},
    { label: "Oktober 2023", value: "Oktober 2023"},
    { label: "November 2023", value: "November 2023"},
    { label: "Dezember 2023", value: "Dezember 2023"}
]