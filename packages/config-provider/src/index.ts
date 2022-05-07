import { providerGlobalConfig } from "@packages/hooks";
import { defineComponent, PropType, renderSlot } from "vue";

export const configProviderProps = {
  size: {
    type: String as PropType<"large" | "small">
  }
};

export default defineComponent({
  name: "LinConfigProvider",
  props: configProviderProps,
  setup(props, context) {
    const config = providerGlobalConfig(props);
    return () =>
      renderSlot(context.slots, "default", { config: config?.value });
  }
});
