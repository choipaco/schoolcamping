"use client"
import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/')
          .then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch((err) => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  return null;
}