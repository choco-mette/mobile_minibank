import { API } from '../js/api.js';

export function init(container) {
    // Force reset container content
    container.innerHTML = '';
    
    // Create wrapper manually to ensure it exists
    const wrapper = document.createElement('div');
    wrapper.className = "flex flex-col h-full bg-gray-50";
    wrapper.style.minHeight = "100vh";
    wrapper.style.backgroundColor = "#f9fafb";
    wrapper.style.width = "100%";
    
    wrapper.innerHTML = `
            <!-- Header -->
            <div class="bg-blue-600 text-white p-4 shadow-md shrink-0" style="background-color: #2563eb; color: white; padding: 1rem;">
                <div class="flex items-center justify-center">
                    <h1 class="text-xl font-bold tracking-wider">MiniBank</h1>
                </div>
            </div>

            <!-- Form Container -->
            <div class="p-6 overflow-y-auto flex-1 flex flex-col justify-center">
                <div class="bg-white rounded-xl shadow-sm p-6 mb-4" style="background-color: white; padding: 1.5rem; border-radius: 0.75rem;">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Login Page</h2>
                    <p class="text-sm text-gray-500 mb-6">Sign in to continue using MiniBank.</p>
                    
                    <form id="login-form" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1" for="username">Username</label>
                            <input class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" id="username" type="text" placeholder="Enter your username" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1" for="password">Password</label>
                            <input class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" id="password" type="password" placeholder="••••••••" required>
                        </div>
                        
                        <!-- Feedback -->
                        <p id="error-msg" class="text-red-500 text-xs text-center hidden bg-red-50 p-2 rounded border border-red-100"></p>

                        <div class="pt-2">
                             <button id="login-btn" class="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition active:scale-95 flex justify-center items-center" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                
                 <div class="text-center">
                    <p class="text-gray-500 text-sm">Don't have an account? <a href="#/register" class="text-blue-600 font-bold cursor-pointer">Register</a></p>
                </div>
            </div>
    `;
    
    container.appendChild(wrapper);

    const form = container.querySelector('#login-form');
    const loginBtn = container.querySelector('#login-btn');
    const errorMsg = container.querySelector('#error-msg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = form.username.value;
        const password = form.password.value;
        
        // Setup loading state
        loginBtn.disabled = true;
        loginBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
        errorMsg.classList.add('hidden');

        try {
            await API.login(username, password);
            window.location.hash = '#/'; // Navigate to Dashboard
        } catch (error) {
            errorMsg.textContent = error.message || 'Login failed. Please check your credentials.';
            errorMsg.classList.remove('hidden');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign In';
        }
    });
}
