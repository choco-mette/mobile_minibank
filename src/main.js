import './css/style.css';
import { Router } from './js/router.js';
import { SplashScreen } from '@capacitor/splash-screen';

document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = document.getElementById('app');
        if (!app) {
            console.error('App container not found!');
            return;
        }

        Router.init();

        // Hide splash screen when ready
        SplashScreen.hide();
    } catch (e) {
        console.error('App: Init failed', e);
    }
});
