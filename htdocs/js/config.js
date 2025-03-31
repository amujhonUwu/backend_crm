// Configuración de la API
const API_CONFIG = {
    BASE_URL: 'http://localhost:5000/api',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            VERIFY: '/auth/verify'
        },
        PERSON: {
            SUMMARY: '/person/summary',
            LIST: '/person',
            DETAIL: (id) => `/person/${id}`
        }
    }
};

// Funciones de utilidad para manejar el token
const TokenManager = {
    getToken() {
        return localStorage.getItem('token');
    },

    setToken(token) {
        localStorage.setItem('token', token);
    },

    removeToken() {
        localStorage.removeItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};

// Funciones para manejar las peticiones HTTP
const ApiService = {
    async request(endpoint, options = {}) {
        const token = TokenManager.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
                ...options,
                headers
            });

            // Si la respuesta es 401 o 403, redirigir al login
            if (response.status === 401 || response.status === 403) {
                TokenManager.removeToken();
                window.location.href = '/login.html';
                return;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en la petición:', error);
            throw error;
        }
    },

    // Métodos específicos para cada operación
    async login(credentials) {
        return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    async register(userData) {
        return this.request(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async getPersonSummary() {
        return this.request(API_CONFIG.ENDPOINTS.PERSON.SUMMARY);
    },

    async getPersonDetail(id) {
        return this.request(API_CONFIG.ENDPOINTS.PERSON.DETAIL(id));
    },

    async createPerson(personData) {
        return this.request(API_CONFIG.ENDPOINTS.PERSON.LIST, {
            method: 'POST',
            body: JSON.stringify(personData)
        });
    },

    async updatePerson(id, personData) {
        return this.request(API_CONFIG.ENDPOINTS.PERSON.DETAIL(id), {
            method: 'PUT',
            body: JSON.stringify(personData)
        });
    },

    async deletePerson(id) {
        return this.request(API_CONFIG.ENDPOINTS.PERSON.DETAIL(id), {
            method: 'DELETE'
        });
    }
};

// Exportar las configuraciones y servicios
window.API_CONFIG = API_CONFIG;
window.TokenManager = TokenManager;
window.ApiService = ApiService; 