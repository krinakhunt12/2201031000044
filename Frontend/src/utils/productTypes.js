// Helper to manage default and admin-added product types per category.
// Admin-added types are persisted in localStorage under 'customProductTypes'.

const DEFAULT_TYPES = {
    Male: ["T-Shirts", "Shirts", "Jackets", "Jeans", "Shorts", "Sweaters"],
    Female: ["Dresses", "Tops", "Skirts", "Jeans", "Jackets", "Sweaters"],
    Kids: ["T-Shirts", "Dresses", "Pants", "Jackets", "Sweaters", "Shorts"]
};

const STORAGE_KEY = 'customProductTypes_v1';

export function getCustomTypes() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

export function saveCustomTypes(map) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) {}
}

export function getTypesForCategory(category) {
    const custom = getCustomTypes();
    const defaults = DEFAULT_TYPES[category] || [];
    const customs = custom[category] || [];
    // Merge and dedupe while preserving case/title
    const map = new Map();
    defaults.concat(customs).forEach(t => map.set(String(t).trim(), t));
    return Array.from(map.values());
}

export function addCustomType(category, typeName) {
    if (!category || !typeName) return false;
    const custom = getCustomTypes();
    const arr = custom[category] || [];
    const normalized = String(typeName).trim();
    if (!arr.includes(normalized) && !(DEFAULT_TYPES[category] || []).includes(normalized)) {
        arr.push(normalized);
        custom[category] = arr;
        saveCustomTypes(custom);
        return true;
    }
    return false;
}

export default {
    getTypesForCategory,
    addCustomType,
    getCustomTypes,
    saveCustomTypes
};