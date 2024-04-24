"use client"
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import Alert from '../_components/alert/alert'; // 경로 확인 필요

interface AlertType {
  id: number;
  message: string;
  isagree: boolean;
}

interface AlertContextType {
  alerts: AlertType[];
  addAlert: (message: string, isagree: boolean) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

let nextId = 0;

export const AlertProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = useCallback((message: string, isagree: boolean) => {
    const id = nextId++;
    setAlerts(alerts => [...alerts, { id, message, isagree }]);
    setTimeout(()=>removeAlert(id), 3000);
    
  }, []);

  const removeAlert = useCallback((id: number) => {
    setAlerts(alerts => alerts.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      {alerts.map((alert) => (
        <Alert key={alert.id} id={alert.id} message={alert.message} isagree={alert.isagree}/>
      ))}
    </AlertContext.Provider>
  );
};
