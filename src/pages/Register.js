import { API } from '../js/api.js';

export function init(container) {
    container.innerHTML = `
        <div class="flex flex-col h-full bg-gray-50">
            <!-- Header -->
            <div class="bg-blue-600 text-white p-4 shadow-md shrink-0">
                <div class="flex items-center">
                    <button id="back-to-login" class="p-2 -ml-2 hover:bg-blue-700 rounded-lg transition mr-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h1 class="text-lg font-bold">Registration</h1>
                </div>
            </div>

            <!-- Form Container -->
            <div class="p-6 pb-24 overflow-y-auto flex-1">
                <div class="bg-white rounded-xl shadow-sm p-6 mb-4">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p class="text-sm text-gray-500 mb-6">Please fill in the form to get started.</p>

                    <form id="register-form" class="space-y-4">
                        
                        <!-- Personal Info -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                            <input type="text" name="full_name" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="Ex: Dodol" required>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                             <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">Birth Date</label>
                                <input type="date" name="birth_date" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="YYYY-MM-DD" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" name="phone_number" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="Ex: 08123456789" required>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">NIK</label>
                            <input type="number" name="nik" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="16 digit NIK" required minlength="16">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Address</label>
                            <textarea name="address" rows="2" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="Complete address" required></textarea>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="name@example.com" required>
                        </div>

                        <!-- Credentials -->
                        <div class="pt-2 border-t border-gray-100 mt-2">
                             <p class="text-xs text-blue-600 font-bold uppercase tracking-wider mb-3">Account Security</p>
                             
                             <div class="mb-3">
                                <label class="block text-xs font-bold text-gray-700 mb-1">Username</label>
                                <input type="text" name="username" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="Unique username" required>
                            </div>

                             <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1">Password</label>
                                    <input type="password" name="password" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium" placeholder="******" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1">PIN (6 Digit)</label>
                                    <input type="password" name="PIN" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm font-medium text-center tracking-widest" placeholder="123456" maxlength="6" inputmode="numeric" required>
                                </div>
                            </div>
                        </div>

                        <!-- Feedback -->
                        <div id="error-alert" class="hidden p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs"></div>
                         <div id="success-alert" class="hidden p-3 bg-green-100 text-green-700 border border-green-200 rounded-lg text-xs"></div>

                        <!-- Submit -->
                        <div class="pt-4">
                            <button type="submit" id="register-btn" class="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition active:scale-95">
                                Register Account
                            </button>
                        </div>
                    </form>
                </div>

                <div class="text-center">
                     <p class="text-gray-500 text-sm">Already have an account? <a href="#/login" class="text-blue-600 font-bold cursor-pointer">Login</a></p>
                </div>
            </div>
        </div>
    `;

    // Navigation
    const backBtn = container.querySelector('#back-to-login');
    backBtn.addEventListener('click', () => {
        window.location.hash = '/login';
    });

    // Form Handling
    const form = container.querySelector('#register-form');
    const registerBtn = container.querySelector('#register-btn');
    const errorAlert = container.querySelector('#error-alert');
    const successAlert = container.querySelector('#success-alert');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset feedback
        errorAlert.classList.add('hidden');
        successAlert.classList.add('hidden');
        registerBtn.disabled = true;
        const originalBtnText = registerBtn.innerText;
        registerBtn.innerHTML = `<svg class="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;

        // Collect Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic Validation
        if (data.PIN.length !== 6) {
             showError("PIN must be exactly 6 digits.");
             resetBtn(registerBtn, originalBtnText);
             return;
        }

        try {
            const response = await API.register(data);
            
            successAlert.textContent = response.message || "Registration successful! Redirecting to login...";
            successAlert.classList.remove('hidden');
            
            setTimeout(() => {
                window.location.hash = '/login';
            }, 2000);

        } catch (error) {
            let msg = error.message;
             try {
                // If error message is a stringified JSON (from our API wrapper)
                const parsed = JSON.parse(msg);
                if (Array.isArray(parsed)) {
                    msg = parsed.map(err => `${err.loc[1]}: ${err.msg}`).join('<br>'); // Handle Pydantic validation errors
                }
            } catch (e) {
                // Not JSON, stick to string
            }
            showError(msg);
            resetBtn(registerBtn, originalBtnText);
        }
    });

    function showError(msg) {
        errorAlert.innerHTML = msg;
        errorAlert.classList.remove('hidden');
    }

    function resetBtn(btn, text) {
        btn.disabled = false;
        btn.innerText = text;
    }
}
