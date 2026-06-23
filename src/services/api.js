

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';



function getToken() {
    return localStorage.getItem('token');
}

async function request(path, options = {}) {
    const token = getToken();

    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
        ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || `Request failed: ${path}`);
        error.status = response.status;
        throw error;
    }

    return data;
}

async function requestFormData(path, formData, method = 'POST') {
    const token = getToken();

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || `Upload failed: ${path}`);
        error.status = response.status;
        throw error;
    }

    return data;
}





const auth = {
    
    register: (body) =>
        request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),

    
    login: (body) =>
        request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

    
    getMe: () => request('/api/auth/me'),

    
    logout: async () => {
        try {
            await request('/api/auth/logout', { method: 'POST' });
        } catch (_) {
            
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
        }
    },

    
    saveSession: ({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role);
    },

    
    getSavedUser: () => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    },
};


const users = {
    getMyProfile: () => request('/api/users/profile'),

    updateProfile: (body) =>
        request('/api/users/profile', { method: 'PUT', body: JSON.stringify(body) }),

    uploadAvatar: (file) => {
        const fd = new FormData();
        fd.append('avatar', file);
        return requestFormData('/api/users/avatar', fd);
    },

    getPublicProfile: (userId) => request(`/api/users/${userId}`),

    getEarnings: () => request('/api/users/earnings'),
};






const categories = {
    getAll: async () => {
        const data = await request('/api/categories');

        
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.categories)) return data.categories;
        if (data && Array.isArray(data.data)) return data.data;

        console.error("❌ Invalid categories response:", data);

        return []; 
    },

    getSubcategories: async (categoryId) => {
        const data = await request(`/api/subcategories/${categoryId}`);
        return Array.isArray(data) ? data : [];
    },

    getGigMetadata: async (subcategoryId) => {
        const data = await request(`/api/gig-metadata/${subcategoryId}`);
        return data || {};
    },

    getPricingFeatures: async (subcategoryId) => {
        const data = await request(`/api/pricing-features/${subcategoryId}`);
        return Array.isArray(data) ? data : [];
    },

    getExtraServices: async () => {
        const data = await request('/api/extra-services');
        return Array.isArray(data) ? data : [];
    },
};




const gigs = {
    
    getAll: () => request('/api/gigs/active'),

    getById: (id) => request(`/api/gigs/${id}`),

    
    getMyGigs: () => request('/api/gigs/active'),

    getActiveGigs: () => request('/api/gigs/active'),

    create: (body) =>
        request('/api/gigs/create', { method: 'POST', body: JSON.stringify(body) }),

    update: (id, body) =>
        request(`/api/gigs/${id}`, { method: 'PUT', body: JSON.stringify(body) }),

    
    publish: (gigId) =>
        request(`/api/gigs/publish/${gigId}`, { method: 'POST' }),

    delete: (id) =>
        request(`/api/gigs/${id}`, { method: 'DELETE' }),

    uploadGallery: (gigId, files) => {
        const fd = new FormData();
        files.forEach((f) => fd.append('files', f));
        return requestFormData(`/api/gigs/${gigId}/gallery`, fd);
    },
};


const orders = {
    create: (body) =>
        request('/api/orders', { method: 'POST', body: JSON.stringify(body) }),

    getBuyerOrders: (status) =>
        request(`/api/orders/buyer${status ? `?status=${status}` : ''}`),

    getSellerOrders: (status) =>
        request(`/api/orders/seller${status ? `?status=${status}` : ''}`),

    getById: (id) => request(`/api/orders/${id}`),

    deliver: (id, body) =>
        request(`/api/orders/${id}/deliver`, { method: 'PUT', body: JSON.stringify(body) }),

    complete: (id) =>
        request(`/api/orders/${id}/complete`, { method: 'PUT', body: JSON.stringify({}) }),

    cancel: (id, reason) =>
        request(`/api/orders/${id}/cancel`, {
            method: 'PUT',
            body: JSON.stringify({ reason }),
        }),

    leaveReview: (id, body) =>
        request(`/api/orders/${id}/review`, { method: 'POST', body: JSON.stringify(body) }),
};




const analytics = {
    getOverview: () => request('/api/analytics/overview'),

    getChart: (range = '30') => request(`/api/analytics/chart?range=${range}`),

    getMap: () => request('/api/analytics/map'),

    getSubcategories: () => request('/api/analytics/subcategories'),

    getRepeatBusiness: (subcategoryId) =>
        request(
            `/api/analytics/repeat-business${subcategoryId ? `?subcategoryId=${subcategoryId}` : ''}`
        ),
};


const upload = {
    file: (file) => {
        const fd = new FormData();
        fd.append('file', file);
        return requestFormData('/api/upload', fd);
    },
};


const api = { auth, users, categories, gigs, orders, analytics, upload };
export default api;


export const getCategories = categories.getAll;
export const getSubcategories = categories.getSubcategories;
export const getGigMetadata = categories.getGigMetadata;
export const getPricingFeatures = categories.getPricingFeatures;
export const getExtraServices = categories.getExtraServices;
export const createGig = gigs.create;
export const updateGig = gigs.update;
export const publishGig = gigs.publish;
export const getGig = gigs.getById;
export const getActiveGigs = gigs.getActiveGigs;
export const getGigBySlug = gigs.getById;