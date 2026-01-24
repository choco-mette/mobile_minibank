import { init as initLogin } from '../pages/Login.js';
import { init as initDashboard } from '../pages/Dashboard.js';
import { init as initHistory } from '../pages/History.js';
import { init as initDeposit } from '../pages/Deposit.js';
import { init as initWithdraw } from '../pages/Withdraw.js';
import { init as initTransfer } from '../pages/Transfer.js';
import { init as initRegister } from '../pages/Register.js';

const routes = {
    '/': { init: initDashboard },
    '/login': { init: initLogin },
    '/history': { init: initHistory },
    '/deposit': { init: initDeposit },
    '/withdraw': { init: initWithdraw },
    '/transfer': { init: initTransfer },
    '/register': { init: initRegister }
};

export const Router = {
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); 
    },

    handleRoute() {
        let hash = window.location.hash || '#/';
        
        // Remove query params if any for matching
        let path = hash.split('?')[0].replace('#', '');
        
        if (path === '') path = '/';

        // Auth Guard
        const isAuthenticated = !!localStorage.getItem('auth_username');
        
        if (!isAuthenticated && path !== '/login' && path !== '/register') {
            window.location.hash = '/login';
            return;
        }
        
        if (isAuthenticated && path === '/login') {
             window.location.hash = '/';
             return;
        }

        const route = routes[path];
        const app = document.getElementById('app');
        
        if (route && route.init) {
            app.innerHTML = ''; // Start auth
            try {
                route.init(app);
            } catch(e) {
                console.error('Router view error', e);
            }
        } else {
            app.innerHTML = `
                <div class="flex flex-col items-center justify-center h-screen">
                    <h1 class="text-4xl font-bold text-gray-300">404</h1>
                    <p class="text-gray-500 mb-4">Page not found</p>
                    <a href="#/" class="text-blue-500">Go Home</a>
                </div>
            `;
        }
    },
    
    navigate(path) {
        window.location.hash = path;
    }
};
