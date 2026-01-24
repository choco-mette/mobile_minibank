export const ModalSuccess = {
    show(message, details = "") {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity opacity-0`;
            modal.id = 'success-modal';
            
            modal.innerHTML = `
                <div class="bg-white rounded-xl p-6 w-80 shadow-2xl transform scale-95 transition-transform flex flex-col items-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Success!</h3>
                    <p class="text-gray-600 text-center text-sm mb-2">${message}</p>
                     ${details ? `<p class="text-gray-500 text-center text-xs mb-6 bg-gray-50 p-2 rounded w-full">${details}</p>` : ''}
                    
                    <button id="ok-success" class="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition">
                        OK
                    </button>
                </div>
            `;

            document.body.appendChild(modal);
            
            // Animation
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div').classList.remove('scale-95');
                modal.querySelector('div').classList.add('scale-100');
            });

            const cleanup = () => {
                modal.classList.add('opacity-0');
                setTimeout(() => {
                   if(document.body.contains(modal)) document.body.removeChild(modal);
                   resolve();
                }, 300);
            };

            modal.querySelector('#ok-success').addEventListener('click', cleanup);
        });
    }
};
