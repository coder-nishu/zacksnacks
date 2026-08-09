import { useMyOrder } from '../../hooks/useMyOrder';
import { useDayLock } from '../../hooks/useDayLock';
import OrderEditor from './OrderEditor';

export default function OrderForm({ employee, config, onToast }) {
  const myOrder = useMyOrder(employee.id);
  const [dayLocked] = useDayLock();

  return (
    <OrderEditor
      key={employee.id}
      employee={employee}
      config={config}
      myOrder={myOrder}
      dayLocked={dayLocked}
      onToast={onToast}
    />
  );
}
