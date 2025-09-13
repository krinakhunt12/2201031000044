export function getStorageKey(base) {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return base;
        const raw = localStorage.getItem('user');
        if (!raw) return base;
        const user = JSON.parse(raw);
        // prefer emailOrPhone, then email, otherwise fallback to id
        let identifier = null;
        if (user && user.emailOrPhone) {
            identifier = user.emailOrPhone;
        } else if (user && user.email) {
            identifier = user.email;
        } else if (user && user.id) {
            identifier = user.id;
        }
        return identifier ? `${base}_${identifier}` : base;
    } catch (err) {
        return base;
    }
}

export function readStorage(base) {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return null;
        const key = getStorageKey(base);
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (err) {
        return null;
    }
}

export function writeStorage(base, value) {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return;
        const key = getStorageKey(base);
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        // ignore
    }
}