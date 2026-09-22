import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenId, TransitionType, Client, StoreConfig } from './types';
import { INITIAL_CONFIG } from './data/mockData';
import { NavigationSidebar } from './components/NavigationSidebar';
import { Header } from './components/Header';

// Screens
import { DashboardScreen } from './screens/DashboardScreen';
import { ConfiguracionScreen } from './screens/ConfiguracionScreen';
import { ReportesScreen } from './screens/ReportesScreen';
import { CuentasPorCobrarScreen } from './screens/CuentasPorCobrarScreen';
import { ClientesScreen } from './screens/ClientesScreen';
import { PagosScreen } from './screens/PagosScreen';
import { NuevaVentaScreen } from './screens/NuevaVentaScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('inicio');
  const [transitionType, setTransitionType] = useState<TransitionType>('none');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [preselectedClient, setPreselectedClient] = useState<Client | null>(null);
  const [config, setConfig] = useState<StoreConfig>(INITIAL_CONFIG);

  const handleNavigate = (screen: ScreenId, transition: TransitionType = 'none') => {
    setTransitionType(transition);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectClientForSale = (client: Client) => {
    setPreselectedClient(client);
  };

  // Determine motion props based on requested transition
  const getMotionProps = () => {
    switch (transitionType) {
      case 'slide_up':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.28, ease: 'easeOut' as const },
        };
      case 'push':
        return {
          initial: { opacity: 0, x: 40 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -30 },
          transition: { duration: 0.25, ease: 'easeOut' as const },
        };
      case 'push_back':
        return {
          initial: { opacity: 0, x: -40 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 30 },
          transition: { duration: 0.25, ease: 'easeOut' as const },
        };
      case 'none':
      default:
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.05 },
        };
    }
  };

  const motionProps = getMotionProps();

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md antialiased">
      {/* Fixed Left Navigation Sidebar */}
      <NavigationSidebar currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Fixed Top Header */}
      <Header
        onNavigate={handleNavigate}
        onSearchChange={setGlobalSearch}
        searchTerm={globalSearch}
      />

      {/* Main Content Area */}
      <main className="ml-64 mt-16 p-space-xl min-h-[calc(100vh-4rem)] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            animate={motionProps.animate}
            className="w-full flex-1"
            exit={motionProps.exit}
            initial={motionProps.initial}
            transition={motionProps.transition}
          >
            {currentScreen === 'inicio' && (
              <DashboardScreen
                onNavigate={handleNavigate}
                onOpenQuickPayment={() => handleNavigate('pagos', 'push')}
              />
            )}

            {currentScreen === 'configuracion' && (
              <ConfiguracionScreen
                config={config}
                onNavigate={handleNavigate}
                onUpdateConfig={setConfig}
              />
            )}

            {currentScreen === 'reportes-y-analiticas' && (
              <ReportesScreen onNavigate={handleNavigate} />
            )}

            {currentScreen === 'cuentas-por-cobrar' && (
              <CuentasPorCobrarScreen onNavigate={handleNavigate} />
            )}

            {currentScreen === 'clientes' && (
              <ClientesScreen
                onNavigate={handleNavigate}
                onSelectClientForSale={handleSelectClientForSale}
              />
            )}

            {currentScreen === 'pagos' && (
              <PagosScreen onNavigate={handleNavigate} />
            )}

            {currentScreen === 'ventas-al-credito' && (
              <NuevaVentaScreen
                onNavigate={handleNavigate}
                preselectedClient={preselectedClient}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
