export function getStorageKey(base) {
    try {
        const raw = localStorage.getItem('user');
        if (!raw) return base;
        const user = JSON.parse(raw);
        // prefer emailOrPhone if present, otherwise fallback to id
        const identifier = user ? .emailOrPhone ? ? user ? .id;
        return identifier ? `${base}_${identifier}` : base;
    } catch (err) {
        return base;
    }
}

export function readStorage(base) {
    try {
        const key = getStorageKey(base);
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (err) {
        return null;
    }
}

export function writeStorage(base, value) {
    try {
        const key = getStorageKey(base);
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        // ignore
    }
}