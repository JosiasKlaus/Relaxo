export const currencyFormater = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});

export function createNestedObject(input: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in input) {
        const keyParts = key.split('_');
        let currentObj = result;

        for (let i = 0; i < keyParts.length; i++) {
            const keyPart = keyParts[i];

            if (!currentObj[keyPart]) {
                if (i === keyParts.length - 1) {
                    currentObj[keyPart] = input[key];
                } else {
                    currentObj[keyPart] = {};
                }
            }

            currentObj = currentObj[keyPart];
        }
    }

    return result;
}
