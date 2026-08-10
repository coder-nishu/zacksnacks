import { strings } from '../../config/strings';
import { useConfig } from '../../hooks/useConfig';
import { useTodayOrders } from '../../hooks/useTodayOrders';
import { buildSummary } from '../../utils/aggregate';
import { downloadOrdersCsv } from '../../utils/exportOrders';
import { resetDay } from '../../services/orderStore';
import ConfirmButton from '../common/ConfirmButton';
import Button from '../common/Button';

export default function AdminActions() {
  const { config } = useConfig();
  const orders = useTodayOrders();

  const handleDownload = () => {
    downloadOrdersCsv(orders, buildSummary(orders), config);
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={handleDownload} className="flex-1">
        {strings.downloadCsv}
      </Button>
      <ConfirmButton
        label={strings.resetDay}
        confirmLabel={strings.resetConfirm}
        onConfirm={resetDay}
        className="inline-flex min-h-11 flex-2 items-center justify-center rounded-lg border border-danger/30 px-4 py-2.5 text-sm font-semibold text-danger shadow-sm transition-colors hover:bg-danger/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2"
      />
    </div>
  );
}
