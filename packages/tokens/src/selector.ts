import { ComputedRef, InjectionKey } from "vue";

interface RowContext {
  parentValueKey?: ComputedRef<string>;
  parentValue?: ComputedRef<String | Object | Number | Boolean | undefined>;
  parentDisabled?: ComputedRef<boolean>;
  parentEmitChange?: (data: any) => any;
}

export const SelectorContextKey: InjectionKey<RowContext> =
  Symbol("SelectorContextKey");
