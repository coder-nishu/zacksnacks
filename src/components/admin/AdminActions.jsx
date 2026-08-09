import { strings } from '../../config/strings';
import { useConfig } from '../../hooks/useConfig';
import { useTodayOrders } from '../../hooks/useTodayOrders';
import { buildSummary } from '../../utils/aggregate';
import { downloadOrdersCsv } from '../../utils/exportOrders';
import { resetDay } from '../../services/orderStore';
import ConfirmButton from '../common/ConfirmButton';

export default function AdminActions() {
  const { config } = useConfig();
  const orders = useTodayOrders();

  const handleDownload = () => {
    downloadOrdersCsv(orders, buildSummary(orders), config);
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleDownload}
        className="flex-1 rounded-lg border border-line px-4 py-3 text-sm font-semibold text-ink hover:bg-paper"
      >
        {strings.downloadCsv}
      </button>
      <ConfirmButton
        label={strings.resetDay}
        confirmLabel={strings.resetConfirm}
        onConfirm={resetDay}
        className="flex-[2] rounded-lg border border-danger/30 px-4 py-3 text-sm font-semibold text-danger hover:bg-danger/10"
      />
    </div>
  );
}
