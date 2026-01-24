export const ModalPin = {
    show() {
        return new Promise((resolve, reject) => {
            const modal = document.createElement('div');
            modal.className = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity opacity-0`;
            modal.id = 'pin-modal';
            
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 w-80 shadow-xl transform scale-95 transition-transform">
                    <h3 class="text-lg font-semibold mb-4 text-center">Enter 6-Digit PIN</h3>
                    <div class="mb-4">
                        <input type="password" maxlength="6" id="pin-input" class="w-full text-center text-2xl tracking-widest border-2 border-gray-300 rounded-md py-2 focus:outline-none focus:border-blue-500" placeholder="••••••">
                        <p id="pin-error" class="text-red-500 text-xs mt-1 hidden">Please enter 6 digits</p>
                    </div>
                    <div class="flex gap-3">
                        <button id="cancel-pin" class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button id="confirm-pin" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Confirm</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            
            // Animation
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div').classList.remove('scale-95');
                modal.querySelector('div').classList.add('scale-100');
            });

            const input = modal.querySelector('#pin-input');
            const errorMsg = modal.querySelector('#pin-error');
            input.focus();

            const cleanup = () => {
                modal.classList.add('opacity-0');
                setTimeout(() => {
                   if(document.body.contains(modal)) document.body.removeChild(modal);
                }, 300);
            };

            const confirm = () => {
                const pin = input.value;
                if (pin.length !== 6 || isNaN(pin)) {
                    errorMsg.classList.remove('hidden');
                    input.classList.add('border-red-500');
                    return;
                }
                cleanup();
                resolve(pin);
            };

            const cancel = () => {
                cleanup();
                reject(new Error('PIN cancelled'));
            };

            modal.querySelector('#confirm-pin').addEventListener('click', confirm);
            modal.querySelector('#cancel-pin').addEventListener('click', cancel);
            
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') confirm();
                if (e.key === 'Escape') cancel();
            });
            
            // Allow numeric only
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                errorMsg.classList.add('hidden');
                input.classList.remove('border-red-500');
            });
        });
    }
};
