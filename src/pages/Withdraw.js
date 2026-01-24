import { API } from '../js/api.js';
import { ModalPin } from '../components/ModalPin.js';
import { ModalSuccess } from '../components/ModalSuccess.js';

export function init(container) {
    container.innerHTML = `
        <div class="flex flex-col h-screen bg-gray-50">
            <!-- Navbar -->
            <div class="bg-red-700 text-white p-4 shadow-lg sticky top-0 z-10">
                <div class="flex items-center gap-3">
                    <button id="back-btn" class="p-1 hover:bg-red-800 rounded">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h1 class="text-xl font-bold">Tarik Tunai</h1>
                </div>
            </div>

            <div class="p-6">
                <!-- Balance Info -->
                <div class="bg-red-600 rounded-xl p-4 text-white mb-6 shadow-md">
                    <p class="text-red-100 text-xs">Current Balance</p>
                    <h2 class="text-2xl font-bold" id="current-balance">Rp ...</h2>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Nominal Penarikan</label>
                    <div class="relative">
                        <span class="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span>
                        <input type="number" id="amount-input" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 font-bold text-lg" placeholder="0">
                    </div>
                     <div class="grid grid-cols-3 gap-2 mt-4">
                        <button class="quick-amount py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 text-gray-700 font-medium" data-amount="50000">50.000</button>
                        <button class="quick-amount py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 text-gray-700 font-medium" data-amount="100000">100.000</button>
                        <button class="quick-amount py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 text-gray-700 font-medium" data-amount="200000">200.000</button>
                        <button class="quick-amount py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 text-gray-700 font-medium" data-amount="500000">500.000</button>
                        <button class="quick-amount py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 text-gray-700 font-medium" data-amount="1000000">1.000.000</button>
                        <button class="quick-amount py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 text-gray-700 font-medium" data-amount="2000000">2.000.000</button>
                    </div>
                </div>

                <div id="feedback-area" class="mt-4 hidden">
                    <!-- Success/Error Message -->
                </div>

                <button id="submit-btn" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow mt-6 hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Lanjut
                </button>
            </div>
        </div>
    `;

    // Init Logic
    loadBalance(container);

    // Navigation
    container.querySelector('#back-btn').addEventListener('click', () => {
        window.history.back();
    });

    const amountInput = container.querySelector('#amount-input');
    const submitBtn = container.querySelector('#submit-btn');
    const feedbackArea = container.querySelector('#feedback-area');

    // Quick Amounts
    container.querySelectorAll('.quick-amount').forEach(btn => {
        btn.addEventListener('click', () => {
            amountInput.value = btn.dataset.amount;
        });
    });

    // Submit Logic
    submitBtn.addEventListener('click', async () => {
        const amount = amountInput.value;
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const pin = await ModalPin.show();
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            feedbackArea.classList.add('hidden');

            const response = await API.withdrawBalance(amount, pin);
            
            // Success Modal
            await ModalSuccess.show(response.message, `New Balance: Rp ${Number(response.data.balance).toLocaleString('id-ID')}`);
            
            // Refresh balance display
            container.querySelector('#current-balance').textContent = `Rp ${Number(response.data.balance).toLocaleString('id-ID')}`;
            
            // Reset input
            amountInput.value = '';
            
            // Optional: Go back to dashboard
            window.history.back();

        } catch (error) {
            if (error.message !== 'PIN cancelled') {
                feedbackArea.innerHTML = `
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Error!</strong>
                        <span class="block sm:inline">${error.message}</span>
                    </div>
                `;
                feedbackArea.classList.remove('hidden');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Lanjut';
        }
    });
}

async function loadBalance(container) {
    try {
        const balanceData = await API.getBalance();
        const balance = balanceData.data?.balance ?? 0;
        container.querySelector('#current-balance').textContent = `Rp ${Number(balance).toLocaleString('id-ID')}`;
    } catch (e) {
        console.error("Failed to load balance", e);
    }
}
