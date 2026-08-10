import { useState } from 'react';
import { strings } from '../../config/strings';
import { submitOrder, clearMyOrder } from '../../services/orderStore';
import { orderItemCount, orderTotal } from '../../utils/aggregate';
import OrderItemRow from './OrderItemRow';
import SnackPicker from './SnackPicker';
import CustomItemRow from './CustomItemRow';
import Button from '../common/Button';
import ConfirmButton from '../common/ConfirmButton';
import EmptyState from '../common/EmptyState';

// Mounted with `key={employee.id}` by OrderForm, so switching employees remounts
// this component and its initial state derives fresh from that person's saved order.
export default function OrderEditor({ employee, config, myOrder, dayLocked, onToast }) {
  const [items, setItems] = useState(() => myOrder?.items ?? []);
  const [isEditing, setIsEditing] = useState(() => !myOrder);
  const [addingCustom, setAddingCustom] = useState(false);
  const [pending, setPending] = useState(false);

  const isLocked = Boolean(myOrder) && !isEditing;
  const disabled = dayLocked || isLocked || pending;

  const mergeItem = (incoming) => {
    const addedQty = incoming.qty ?? 1;
    setItems((prev) => {
      const existing = prev.find((item) => item.name === incoming.name);
      if (existing) {
        return prev.map((item) =>
          item.name === incoming.name ? { ...item, qty: item.qty + addedQty } : item,
        );
      }
      return [...prev, { name: incoming.name, price: incoming.price, qty: addedQty }];
    });
  };

  const handleChangeQty = (name, qty) => {
    setItems((prev) => prev.map((item) => (item.name === name ? { ...item, qty } : item)));
  };

  const handleRemove = (name) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  };

  const handleSave = async () => {
    setPending(true);
    try {
      await submitOrder(employee.id, employee.name, items);
      setIsEditing(false);
      onToast(strings.orderSavedFor(employee.name));
    } catch (err) {
      console.error('submitOrder failed', err);
      onToast(strings.saveFailed, 'error');
    } finally {
      setPending(false);
    }
  };

  const handleClear = async () => {
    setPending(true);
    try {
      await clearMyOrder(employee.id);
      setItems([]);
      onToast(strings.orderCleared);
    } catch (err) {
      console.error('clearMyOrder failed', err);
      onToast(strings.clearFailed, 'error');
    } finally {
      setPending(false);
    }
  };

  const itemCount = orderItemCount(items);
  const totalCost = orderTotal(items);
  const hasUnpriced = items.some((item) => item.price == null);
  const canSave = itemCount > 0 && !dayLocked && !pending;

  if (dayLocked && !myOrder) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <EmptyState icon="🔒" title={strings.dayClosedNotice} />
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="mx-auto max-w-xl space-y-4 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-xl font-bold text-ink">{employee.name}</p>
            <p className="text-sm text-muted">{strings.orderHeading}</p>
          </div>
          {isEditing && Boolean(myOrder) && (
            <span className="shrink-0 rounded-full border border-amber bg-amber-soft px-3 py-1 text-xs font-semibold text-amber">
              {strings.editingBadge}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState icon="🍽️" title={strings.addAtLeastOne} />
        ) : (
          <div className="overflow-hidden rounded-xl border border-line bg-surface">
            {items.map((item) => (
              <OrderItemRow
                key={item.name}
                item={item}
                currency={config.currency}
                disabled={disabled}
                onChangeQty={(qty) => handleChangeQty(item.name, qty)}
                onRemove={() => handleRemove(item.name)}
              />
            ))}
          </div>
        )}

        {!disabled && (
          <div className="space-y-3">
            {addingCustom ? (
              <CustomItemRow
                onAdd={(item) => {
                  mergeItem(item);
                  setAddingCustom(false);
                }}
                onCancel={() => setAddingCustom(false)}
              />
            ) : (
              <div className="flex items-center gap-3">
                <SnackPicker snacks={config.snacks} currency={config.currency} onSelect={mergeItem} />
                <button
                  type="button"
                  onClick={() => setAddingCustom(true)}
                  className="text-sm font-semibold text-brand hover:text-brand-ink"
                >
                  {strings.customItem}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-10 border-t border-line bg-surface px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_12px_-4px_rgb(0_0_0/0.08)] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-sm font-semibold text-ink tabular-nums">
            {strings.orderSubtitle(itemCount, totalCost, config.currency)}
            {hasUnpriced && '+'}
          </p>

          <div className="flex items-center gap-2">
            {isLocked && (
              <ConfirmButton
                label={strings.clearMyOrder}
                confirmLabel={strings.clearConfirm}
                onConfirm={handleClear}
                disabled={pending}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-danger/30 px-4 py-3 text-sm font-semibold text-danger transition-colors hover:bg-danger/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2"
              />
            )}

            {isLocked ? (
              <Button variant="secondary" onClick={() => setIsEditing(true)} disabled={dayLocked}>
                {strings.editOrder}
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSave} disabled={!canSave} pending={pending}>
                {pending ? strings.savingOrder : strings.saveOrder}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
