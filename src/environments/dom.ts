
// Ajoute une classe d'un élément identifié par un ID
export function addClass(className: string, elementName: string) {
    let element = document.getElementById(elementName);
    element?.classList.add(className);
}

// Remplace une classe d'un élément identifié par un ID
export function replaceClass(id: string, oldClass: string, newClass: string) {
    let element = document.getElementById(id);
    element?.classList.replace(oldClass, newClass);
}

// Supprime une classe d'un élément identifié par un ID
export function removeClass(id: string, className: string) {
    let element = document.getElementById(id);
    element?.classList.remove(className);
}
