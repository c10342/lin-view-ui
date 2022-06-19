import { ComputedRef, InjectionKey } from "vue";

interface DropdownContext {
  hideOnClick?: ComputedRef<boolean>;
  hideList?: () => void;
  emitCommand?: (data: string) => void;
}

export const dropdownKey: InjectionKey<DropdownContext> = Symbol("DropdownKey");
