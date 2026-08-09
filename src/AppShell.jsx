import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Tabs from './components/common/Tabs';
import EmptyState from './components/common/EmptyState';
import OrderForm from './components/order/OrderForm';
import SummaryView from './components/summary/SummaryView';
import Toast from './components/common/Toast';
import { useConfig } from './hooks/useConfig';
import { strings } from './config/strings';

export default function AppShell() {
  const { config } = useConfig();
  const { employeeId } = useParams();
  const [tab, setTab] = useState('order');
  const [toast, setToast] = useState('');

  const employee = config.employees.find((e) => e.id === employeeId) || null;
  const hasSelection = Boolean(employee);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header />
      <Tabs active={tab} onChange={setTab} />

      {tab === 'summary' ? (
        <main key="summary" className="flex-1 motion-safe:animate-fade">
          <SummaryView />
        </main>
      ) : (
        <main key="order" className="flex flex-1 overflow-hidden motion-safe:animate-fade">
          <div className={`${hasSelection ? 'hidden md:block' : 'block'} w-full shrink-0 border-r border-line bg-paper md:w-80`}>
            <Sidebar activeId={employee?.id} className="h-full" />
          </div>

          <div className={`${hasSelection ? 'block' : 'hidden md:block'} flex-1 overflow-y-auto`}>
            {employee ? (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-muted hover:text-ink md:hidden"
                >
                  ← {strings.back}
                </Link>
                <OrderForm employee={employee} config={config} onToast={setToast} />
              </>
            ) : (
              <div className="px-4 py-8 sm:px-6">
                <EmptyState title={strings.whoIsOrdering} description={strings.pickYourName} />
              </div>
            )}
          </div>
        </main>
      )}

      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  );
}
