import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Tabs from './components/common/Tabs';
import EmptyState from './components/common/EmptyState';
import OrderForm from './components/order/OrderForm';
import SummaryView from './components/summary/SummaryView';
import Toast from './components/common/Toast';
import AdminMenuBar from './components/admin/AdminMenuBar';
import { useConfig } from './hooks/useConfig';
import { useAdmin } from './hooks/useAdmin';
import { strings } from './config/strings';

export default function AppShell() {
  const { config } = useConfig();
  const { isAdmin } = useAdmin();
  const { employeeId } = useParams();
  const [tab, setTab] = useState('order');
  const [toast, setToast] = useState({ message: '', variant: 'success' });
  const [adminBarOpen, setAdminBarOpen] = useState(true);
  const showToast = (message, variant = 'success') => setToast({ message, variant });

  const employee = config.employees.find((e) => e.id === employeeId) || null;
  const hasSelection = Boolean(employee);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="sticky top-0 z-20">
        <Header adminBarOpen={adminBarOpen} onToggleAdminBar={() => setAdminBarOpen((v) => !v)} />
        <Tabs active={tab} onChange={setTab} />
      </div>

      {isAdmin && adminBarOpen && <AdminMenuBar />}

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
                  className="mx-4 mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-sm hover:bg-paper md:hidden"
                >
                  ← {strings.back}
                </Link>
                <OrderForm employee={employee} config={config} onToast={showToast} />
              </>
            ) : (
              <div className="px-4 py-8 sm:px-6">
                <EmptyState icon="👋" title={strings.whoIsOrdering} description={strings.pickYourName} />
              </div>
            )}
          </div>
        </main>
      )}

      <Toast
        message={toast.message}
        variant={toast.variant}
        onDismiss={() => setToast({ message: '', variant: 'success' })}
      />
    </div>
  );
}
