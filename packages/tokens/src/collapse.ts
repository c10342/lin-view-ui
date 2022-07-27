import { ComputedRef, InjectionKey } from "vue";

type ArrayValue = Array<string | number>;
type ValueType = ArrayValue | string | number;

interface RowContext {
  value?: ComputedRef<ValueType | undefined | null>;
  simple?: ComputedRef<boolean>;
  accordion?: ComputedRef<boolean>;
  emitChange?: (data: ValueType) => void;
}

export const CollapseContextKey: InjectionKey<RowContext> = Symbol("CollapseContextKey");
