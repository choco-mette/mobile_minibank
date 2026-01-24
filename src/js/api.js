// Gunakan proxy saat development (localhost), gunakan URL absolute saat production (APK)
const API_BASE_URL = import.meta.env.MODE === 'development' 
    ? '/api/v1' 
    : 'https://service.bank.tomodachi.biz.id/api/v1';

export const API = {
    async request(endpoint, method = 'GET', body = null, requireAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (requireAuth) {
            const username = localStorage.getItem('auth_username');
            const password = localStorage.getItem('auth_password');
            if (username && password) {
                headers['Authorization-Username'] = username;
                headers['Authorization-Password'] = password;
            }
        }

        const config = {
            method,
            headers,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const contentType = response.headers.get("content-type");
            
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('auth_username');
                localStorage.removeItem('auth_password');
                window.location.hash = '#/login';
                throw new Error('Unauthorized');
            }

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.detail ? JSON.stringify(data.detail) : 'API Error');
                }
                return data;
            } else {
                 if (!response.ok) throw new Error(response.statusText);
                 return response.text();
            }

        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    },

    async register(data) {
        return this.request('/auth/register', 'POST', data, false);
    },

    async login(username, password) {
        // According to OpenAPI, login takes headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization-Username': username,
            'Authorization-Password': password
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: headers
            });
            
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || 'Login failed');
            }

            // Store credentials if successful
            localStorage.setItem('auth_username', username);
            localStorage.setItem('auth_password', password);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async getBalance() {
        return this.request('/accounts/balance');
    },

    async getAccountDetail() {
        return this.request('/accounts/detail');
    },

    async getTransactionList(startDate, endDate, pin) {
        const params = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            PIN: pin
        });
        return this.request(`/accounts/transactionlist?${params.toString()}`);
    },

    async getMutationList(startDate, endDate, pin) {
        const params = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            PIN: pin
        });
        return this.request(`/accounts/mutationlist?${params.toString()}`);
    },

    async depositBalance(amount, pin) {
        return this.request('/transaction/balance/deposit', 'POST', {
            amount: Number(amount),
            PIN: pin
        });
    },

    async withdrawBalance(amount, pin) {
        return this.request('/transaction/balance/withdraw', 'POST', {
            amount: Number(amount),
            PIN: pin
        });
    },

    async transferOverbook(targetAccount, amount, pin, description = "") {
        return this.request('/transaction/overbook', 'POST', {
            target_account_number: targetAccount,
            amount: Number(amount),
            PIN: pin,
            description: description,
            bank_reference: "Bank Samiun"
        });
    }
};
