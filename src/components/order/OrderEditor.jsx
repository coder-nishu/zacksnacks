import { useState } from 'react';
import { strings } from '../../config/strings';
import { submitOrder, clearMyOrder } from '../../services/orderStore';
import { orderItemCount, orderTotal } from '../../utils/aggregate';
import OrderItemRow from './OrderItemRow';
import SnackPicker from './SnackPicker';
import CustomItemRow from './CustomItemRow';

// Mounted with `key={employee.id}` by OrderForm, so switching employees remounts
// this component and its initial state derives fresh from that person's saved order.
export default function OrderEditor({ employee, config, myOrder, dayLocked, onToast }) {
  const [items, setItems] = useState(() => myOrder?.items ?? []);
  const [isEditing, setIsEditing] = useState(() => !myOrder);
  const [addingCustom, setAddingCustom] = useState(false);

  const isLocked = Boolean(myOrder) && !isEditing;
  const disabled = dayLocked || isLocked;

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

  const handleSave = () => {
    submitOrder(employee.id, employee.name, items);
    setIsEditing(false);
    onToast(strings.orderSavedFor(employee.name));
  };

  const handleClear = () => {
    clearMyOrder(employee.id);
    setItems([]);
    onToast(strings.orderCleared);
  };

  const itemCount = orderItemCount(items);
  const totalCost = orderTotal(items);
  const hasUnpriced = items.some((item) => item.price == null);
  const canSave = itemCount > 0 && !dayLocked;

  if (dayLocked && !myOrder) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-10 text-center">
          <p className="text-sm text-muted">{strings.dayClosedNotice}</p>
        </div>
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
          <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-8 text-center">
            <p className="text-sm text-muted">{strings.addAtLeastOne}</p>
          </div>
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

      <div className="sticky bottom-0 z-10 border-t border-line bg-surface px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-muted">
            <p className="font-mono font-semibold text-ink tabular-nums">
              {strings.orderSubtitle(itemCount, totalCost, config.currency)}
              {hasUnpriced && '+'}
            </p>
            {isLocked && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-danger underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
              >
                {strings.clearMyOrder}
              </button>
            )}
          </div>

          {isLocked ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={dayLocked}
              className="rounded-lg border border-line bg-surface px-5 py-3 text-base font-semibold text-ink hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✏️ Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="rounded-lg bg-brand px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Save order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
