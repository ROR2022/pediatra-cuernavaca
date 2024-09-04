// components/InstallButton.tsx
import React, { useState, useEffect } from 'react';
//importar el icono de instalación de material ui
import { AddToHomeScreen } from '@mui/icons-material';
//importar Button de material ui
import { Button } from '@mui/material';

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    const promptEvent = deferredPrompt as any;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA setup accepted');
    } else {
      console.log('PWA setup rejected');
    }
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button 
    sx={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
    onClick={handleInstallClick}>
       <AddToHomeScreen/>  Install
    </Button>
  );
};

export default InstallButton;
