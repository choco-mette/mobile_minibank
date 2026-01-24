import { API } from '../js/api.js';
import { ModalPin } from '../components/ModalPin.js';
import { ModalSuccess } from '../components/ModalSuccess.js';

export function init(container) {
    container.innerHTML = `
        <div class="flex flex-col h-screen bg-gray-50">
            <!-- Navbar -->
            <div class="bg-blue-700 text-white p-4 shadow-lg sticky top-0 z-10">
                <div class="flex items-center gap-3">
                    <button id="back-btn" class="p-1 hover:bg-blue-800 rounded">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h1 class="text-xl font-bold">Transfer Overbook</h1>
                </div>
            </div>

            <div class="p-6 overflow-y-auto">
                <!-- Balance Info -->
                <div class="bg-blue-600 rounded-xl p-4 text-white mb-6 shadow-md">
                    <p class="text-blue-100 text-xs">Available Balance</p>
                    <h2 class="text-2xl font-bold" id="current-balance">Rp ...</h2>
                </div>

                <form id="transfer-form" class="space-y-4">
                    <div class="bg-white rounded-xl shadow-sm p-4">
                        <label class="block text-gray-700 text-xs font-bold mb-2">Rekening Tujuan</label>
                        <input type="number" id="target-account" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 font-medium" placeholder="Ex: 1013xxxxx" required>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm p-4">
                        <label class="block text-gray-700 text-xs font-bold mb-2">Nominal Transfer</label>
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span>
                            <input type="number" id="amount-input" class="w-full pl-10 pr-3 py-2 border border-blue-100 bg-blue-50 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-lg" placeholder="0" required>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm p-4">
                        <label class="block text-gray-700 text-xs font-bold mb-2">Berita / Catatan (Optional)</label>
                        <textarea id="description-input" rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 text-sm" placeholder="Ex: Bayar hutang"></textarea>
                    </div>

                    <div id="feedback-area" class="mt-4 hidden"></div>

                    <div class="pt-4">
                         <button type="submit" id="submit-btn" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            Lanjut Transfer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Init Logic
    loadBalance(container);

    // Navigation
    container.querySelector('#back-btn').addEventListener('click', () => {
        window.history.back();
    });

    const form = container.querySelector('#transfer-form');
    const submitBtn = container.querySelector('#submit-btn');
    const feedbackArea = container.querySelector('#feedback-area');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const targetAccount = container.querySelector('#target-account').value;
        const amount = container.querySelector('#amount-input').value;
        const description = container.querySelector('#description-input').value;

        if (!targetAccount || !amount || amount <= 0) {
            alert("Please check your input fields");
            return;
        }

        try {
            const pin = await ModalPin.show();
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            feedbackArea.classList.add('hidden');

            const response = await API.transferOverbook(targetAccount, amount, pin, description);
            
            // Success Modal
            // We assume success if no error was thrown
            await ModalSuccess.show("Transfer Berhasil!", `Terkirim ke ${targetAccount}<br>Rp ${Number(amount).toLocaleString('id-ID')}`);
            
            // Refresh balance not strictly needed if we go back, but good practice
            loadBalance(container);
            
            // Clear inputs
            form.reset();
            
            // Optional: Go back
             window.history.back();

        } catch (error) {
            if (error.message !== 'PIN cancelled') {
                feedbackArea.innerHTML = `
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                        <strong class="font-bold">Transfer Failed!</strong>
                        <span class="block">${error.message}</span>
                    </div>
                `;
                feedbackArea.classList.remove('hidden');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Lanjut Transfer';
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
