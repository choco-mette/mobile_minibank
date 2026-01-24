// Dashboard component with Bottom Navigation
import { API } from '../js/api.js';

export function init(container) {
    // Basic Layout with Content Area and Bottom Nav
    container.innerHTML = `
        <div class="flex flex-col h-screen bg-gray-50 relative">
            
            <!-- Content Area -->
            <div id="dashboard-content" class="flex-1 overflow-y-auto pb-20 no-scrollbar">
                <!-- Views will be injected here -->
            </div>

            <!-- Bottom Navigation -->
            <div class="bg-white border-t border-gray-200 fixed bottom-0 w-full flex justify-around py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <button id="nav-home" class="flex flex-col items-center group w-1/2 p-1">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors mb-0.5 group-active:bg-gray-100">
                         <svg class="w-6 h-6 nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </div>
                    <span class="text-[10px] font-bold nav-label">Home</span>
                </button>
                <button id="nav-customer" class="flex flex-col items-center group w-1/2 p-1">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors mb-0.5 group-active:bg-gray-100">
                         <svg class="w-6 h-6 nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <span class="text-[10px] font-bold nav-label">Customer</span>
                </button>
            </div>
        </div>
    `;

    const contentArea = container.querySelector('#dashboard-content');
    const navHome = container.querySelector('#nav-home');
    const navCustomer = container.querySelector('#nav-customer');

    /* === HOME VIEW === */
    const renderHome = () => {
        contentArea.innerHTML = `
        <div class="flex flex-col h-full">
             <!-- Navbar -->
            <div class="bg-blue-700 text-white p-6 shadow-lg pb-20 rounded-b-[2.5rem]">
                <div class="flex justify-between items-start mb-6">
                    <div>
                         <h1 class="text-xl font-bold tracking-tight">MiniBank</h1>
                         <p class="text-blue-200 text-xs mt-1">Welcome back, <span id="user-greeting">User</span>!</p>
                    </div>
                    <button id="logout-btn" class="bg-blue-800/50 backdrop-blur-sm p-2 rounded-xl hover:bg-blue-800 transition border border-blue-600/30">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                </div>
                <div class="flex flex-col items-center mb-2">
                    <p class="text-blue-200 text-sm mb-2 font-medium">Total Balance</p>
                    <h2 class="text-4xl font-bold tracking-tight" id="balance-display">Rp ...</h2>
                </div>
            </div>

            <!-- Menus -->
            <div class="flex-1 px-4">
                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 py-8 px-4 -mt-16 mb-6 flex justify-around items-start">
                     <button onclick="window.location.hash='#/transfer'" class="flex flex-col items-center gap-3 p-2 active:bg-gray-50 rounded-xl transition group">
                        <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-200">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition">Transfer</span>
                    </button>
                     <button onclick="window.location.hash='#/deposit'" class="flex flex-col items-center gap-3 p-2 active:bg-gray-50 rounded-xl transition group">
                        <div class="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-200">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-gray-600 group-hover:text-green-600 transition">Setor</span>
                    </button>
                     <button onclick="window.location.hash='#/withdraw'" class="flex flex-col items-center gap-3 p-2 active:bg-gray-50 rounded-xl transition group">
                        <div class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-200">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-gray-600 group-hover:text-red-600 transition">Tarik</span>
                    </button>
                     <button onclick="window.location.hash='#/history'" class="flex flex-col items-center gap-3 p-2 active:bg-gray-50 rounded-xl transition group">
                        <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-200">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-gray-600 group-hover:text-purple-600 transition">History</span>
                    </button>
                </div>
            </div>
        </div>
        `;
        
        attachHomeListeners();
        loadHomeData();
    };

    /* === CUSTOMER VIEW === */
    const renderCustomer = async () => {
        contentArea.innerHTML = `<div class="flex items-center justify-center h-full"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>`;
        
        try {
            // Fetch account detail
            const response = await API.getAccountDetail();
            const user = response.data || response;
            
            contentArea.innerHTML = `
               <div class="flex flex-col min-h-full bg-gray-50">
                    <div class="bg-white pb-6 pt-12 px-4 sm:px-6 rounded-b-[2rem] shadow-sm mb-6 relative overflow-hidden shrink-0">
                        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <div class="flex flex-col items-center relative z-10">
                            <div class="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold mb-4 shadow-inner ring-4 ring-white">
                                ${user.full_name ? user.full_name.charAt(0) : 'U'}
                            </div>
                            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight text-center px-2">${user.full_name || 'User'}</h2>
                            <p class="text-gray-500 font-medium text-sm text-center">${user.email || '-'}</p>
                            <span class="mt-3 px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">${user.status || 'Active'}</span>
                        </div>
                    </div>

                    <div class="px-4 sm:px-6 space-y-3 sm:space-y-4 pb-10">
                         <!-- Details -->
                        <div class="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4 hover:shadow-md transition">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl shrink-0">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Account Number</p>
                                <p class="text-base sm:text-lg font-bold text-gray-800 font-mono break-all">${user.account_number || '-'}</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4 hover:shadow-md transition">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-xl shrink-0">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                                <p class="text-sm sm:text-base font-bold text-gray-800 truncate">${user.phone_number || '-'}</p>
                            </div>
                        </div>
                        
                         <div class="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4 hover:shadow-md transition">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-50 text-orange-600 rounded-xl shrink-0">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Birth Date</p>
                                <p class="text-sm sm:text-base font-bold text-gray-800 truncate">${user.birth_date || '-'}</p>
                            </div>
                        </div>

                         <div class="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3 sm:gap-4 hover:shadow-md transition">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-50 text-red-600 rounded-xl shrink-0">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Address</p>
                                <p class="text-sm font-bold text-gray-800 leading-relaxed">${user.address || '-'}</p>
                            </div>
                        </div>

                        <button id="logout-btn-profile" class="w-full mt-4 bg-white border border-red-100 text-red-600 py-3 rounded-xl font-bold shadow-sm hover:bg-red-50 transition">
                            Logout
                        </button>
                    </div>
               </div>
            `;
            
            contentArea.querySelector('#logout-btn-profile').addEventListener('click', () => {
                localStorage.removeItem('auth_username');
                localStorage.removeItem('auth_password');
                window.location.hash = '/login';
            });

        } catch (e) {
            console.error(e);
            contentArea.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <p class="text-gray-800 font-bold mb-2">Could not load profile</p>
                    <p class="text-gray-500 text-sm mb-6">Please check your internet connection.</p>
                    <button id="retry-btn" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-600/30">Retry</button>
                </div>
            `;
            contentArea.querySelector('#retry-btn')?.addEventListener('click', renderCustomer);
        }
    };


    /* === LOGIC === */
    function attachHomeListeners() {
        contentArea.querySelector('#logout-btn')?.addEventListener('click', () => {
             localStorage.removeItem('auth_username');
             localStorage.removeItem('auth_password');
             window.location.hash = '/login';
        });
    }

    async function loadHomeData() {
        try {
            const balanceData = await API.getBalance();
            const balance = balanceData.data?.balance ?? 0;
            const balanceEl = contentArea.querySelector('#balance-display');
            if(balanceEl) balanceEl.textContent = `Rp ${Number(balance).toLocaleString('id-ID')}`;

            const username = localStorage.getItem('auth_username');
            const userEl = contentArea.querySelector('#user-greeting');
            if(userEl && username) userEl.textContent = username;

        } catch (e) {
            console.error(e);
        }
    }

    const updateNavStyles = (activeId) => {
        [navHome, navCustomer].forEach(btn => {
            const isActive = btn.id === activeId;
            const icon = btn.querySelector('.nav-icon');
            const label = btn.querySelector('.nav-label');
            
            if (isActive) {
                btn.classList.add('text-blue-600');
                btn.classList.remove('text-gray-400');
            } else {
                btn.classList.add('text-gray-400');
                btn.classList.remove('text-blue-600');
            }
        });
    };

    navHome.addEventListener('click', () => {
        updateNavStyles('nav-home');
        renderHome();
    });

    navCustomer.addEventListener('click', () => {
        updateNavStyles('nav-customer');
        renderCustomer();
    });

    // Default Init
    updateNavStyles('nav-home');
    renderHome();
}
