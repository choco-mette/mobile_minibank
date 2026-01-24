import { API } from '../js/api.js';
import { ModalPin } from '../components/ModalPin.js';

export function init(container) {
    container.innerHTML = `
        <div class="flex flex-col h-screen bg-gray-50">
            <!-- Navbar -->
            <div class="bg-blue-700 text-white p-4 shadow-lg sticky top-0 z-10">
                <div class="flex items-center gap-3">
                    <button id="back-btn" class="p-1 hover:bg-blue-800 rounded">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h1 class="text-xl font-bold">History</h1>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex bg-white shadow-sm border-b border-gray-100">
                <button id="tab-transactions" class="flex-1 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 transition-colors focus:outline-none">
                    Transactions
                </button>
                <button id="tab-mutations" class="flex-1 py-4 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-colors focus:outline-none">
                    Mutations
                </button>
            </div>

            <!-- Filters (Only for Transactions initially) -->
            <div id="filter-section" class="bg-white p-4 shadow-sm mb-2">
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label class="block text-xs text-gray-500 mb-1">Start Date</label>
                        <input type="date" id="start-date" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs text-gray-500 mb-1">End Date</label>
                        <input type="date" id="end-date" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                    </div>
                </div>
                <button id="filter-btn" class="w-full bg-blue-600 text-white text-sm font-bold py-2 rounded hover:bg-blue-700 transition">
                    Show History
                </button>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-4 pt-0" id="history-content">
                <!-- Transaction List (Default) -->
                <div id="view-transactions" class="space-y-3 pb-20">
                    <div class="text-center text-gray-400 mt-10">
                        <p>Select dates and click "Show History"</p>
                    </div>
                </div>

                <!-- Mutation List (Hidden) -->
                <div id="view-mutations" class="space-y-3 hidden pb-20">
                     <div class="animate-pulse space-y-3 mt-4">
                        <div class="bg-white p-4 rounded-xl shadow-sm h-20"></div>
                        <div class="bg-white p-4 rounded-xl shadow-sm h-20"></div>
                        <div class="bg-white p-4 rounded-xl shadow-sm h-20"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Set Default Dates (Today)
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = container.querySelector('#start-date');
    const endDateInput = container.querySelector('#end-date');
    
    startDateInput.value = today;
    endDateInput.value = today;

    // Navigation
    container.querySelector('#back-btn').addEventListener('click', () => {
        window.history.back();
    });

    // Tab Logic
    const tabTrans = container.querySelector('#tab-transactions');
    const tabMut = container.querySelector('#tab-mutations');
    const viewTrans = container.querySelector('#view-transactions');
    const viewMut = container.querySelector('#view-mutations');
    const filterSection = container.querySelector('#filter-section');

    let currentTab = 'transactions';

    const switchTab = (type) => {
        currentTab = type;
        if (type === 'transactions') {
            tabTrans.className = 'flex-1 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 transition-colors focus:outline-none';
            tabMut.className = 'flex-1 py-4 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-colors focus:outline-none';
            viewTrans.classList.remove('hidden');
            viewMut.classList.add('hidden');
        } else {
            tabMut.className = 'flex-1 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 transition-colors focus:outline-none';
            tabTrans.className = 'flex-1 py-4 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-colors focus:outline-none';
            viewMut.classList.remove('hidden');
            viewTrans.classList.add('hidden');
            
            // Show placeholder if empty
            if (viewMut.children.length === 0 || viewMut.querySelector('.animate-pulse')) {
                 viewMut.innerHTML = '<div class="text-center text-gray-400 mt-10"><p>Select dates and click "Show History"</p></div>';
            }
        }
        filterSection.classList.remove('hidden'); // Show filter for both
    };

    tabTrans.addEventListener('click', () => switchTab('transactions'));
    tabMut.addEventListener('click', () => switchTab('mutations'));

    // Filter Logic
    const filterBtn = container.querySelector('#filter-btn');
    
    filterBtn.addEventListener('click', async () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if(!startDate || !endDate) {
            alert("Please select both start and end dates");
            return;
        }

        const activeContainer = currentTab === 'transactions' ? viewTrans : viewMut;
        
        try {
            const pin = await ModalPin.show();
            
            // Show Loading
            activeContainer.innerHTML = `
                <div class="animate-pulse space-y-3 mt-4">
                    <div class="bg-white p-4 rounded-xl shadow-sm h-20"></div>
                    <div class="bg-white p-4 rounded-xl shadow-sm h-20"></div>
                </div>
            `;

            if (currentTab === 'transactions') {
                const response = await API.getTransactionList(startDate, endDate, pin);
                renderTransactions(viewTrans, response.data || []);
            } else {
                const response = await API.getMutationList(startDate, endDate, pin);
                renderMutations(viewMut, response.data || []);
            }
            
        } catch (error) {
            if (error.message !== 'PIN cancelled') {
                activeContainer.innerHTML = `<div class="text-center text-red-500 mt-10"><p>${error.message}</p></div>`;
            } else {
                 // Restore placeholder if cancelled and empty
                 if (activeContainer.children.length === 1 && activeContainer.querySelector('.animate-pulse')) {
                     activeContainer.innerHTML = '<div class="text-center text-gray-400 mt-10"><p>Select dates and click "Show History"</p></div>';
                 }
            }
        }
    });
}

function renderTransactions(container, transactions) {
    container.innerHTML = '';
    
    if (transactions.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 mt-10"><p>No transactions found</p></div>';
        return;
    }

    transactions.forEach(item => {
        const amount = item.amount || 0;
        const type = item.type || 'Transaction';
        const date = item.date ? new Date(item.date).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
        }) : '-';
        
        // Assuming Trf is debit (Money out) based on sample showing source_account
        const isDebit = type.toLowerCase().includes('trf'); 
        const amountClass = isDebit ? 'text-red-600' : 'text-gray-800';
        const amountSign = isDebit ? '-' : '';

        const description = item.description || `To: ${item.target_account}`;

        const el = document.createElement('div');
        el.className = 'bg-white p-4 rounded-xl shadow-sm flex justify-between items-center';
        el.innerHTML = `
            <div>
                <h4 class="font-bold text-gray-800 text-sm">${type}</h4>
                <p class="text-xs text-gray-500 max-w-[160px] truncate">${description}</p>
                <div class="flex items-center gap-2 mt-1">
                     <p class="text-[10px] text-gray-400">${date}</p>
                     <p class="text-[10px] text-blue-400 bg-blue-50 px-1 rounded">${item.bank}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="block font-bold ${amountClass} text-sm">${amountSign}Rp ${Number(amount).toLocaleString('id-ID')}</span>
                <span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded mt-1 inline-block">${item.source_account} &rarr; ${item.target_account}</span>
            </div>
        `;
        container.appendChild(el);
    });
}

function renderMutations(container, mutations) {
    container.innerHTML = '';
    
    if (mutations.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 mt-10"><p>No mutations found</p></div>';
        return;
    }

    mutations.forEach(item => {
        const amount = item.amount || 0;
        const type = item.mutation_type || 'Unknown';
        const date = item.timestamp ? new Date(item.timestamp).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
        }) : '-';
        
        // "Kredit" usually money IN, "Debit" money OUT
        const isMoneyIn = type.toLowerCase() === 'kredit'; 
        const amountClass = isMoneyIn ? 'text-green-600' : 'text-red-600';
        const amountSign = isMoneyIn ? '+' : '-';

        const description = item.description || (item.related_account_number ? `Ref: ${item.related_account_number}` : '-');

        const el = document.createElement('div');
        el.className = 'bg-white p-4 rounded-xl shadow-sm flex justify-between items-center';
        el.innerHTML = `
            <div>
                <h4 class="font-bold text-gray-800 text-sm">${type}</h4>
                <p class="text-xs text-gray-500 max-w-[160px] truncate">${description}</p>
                 <div class="flex items-center gap-2 mt-1">
                     <p class="text-[10px] text-gray-400">${date}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="block font-bold ${amountClass} text-sm">${amountSign}Rp ${Number(amount).toLocaleString('id-ID')}</span>
                <span class="text-[10px] text-gray-400">Bal: Rp ${Number(item.balance_after).toLocaleString('id-ID')}</span>
            </div>
        `;
        container.appendChild(el);
    });
}
