import { providerGlobalConfig } from "@packages/hooks";
import { defineComponent, PropType, renderSlot } from "vue";

export const configProviderProps = {
  size: {
    type: String as PropType<"large" | "small">
  },
  locale: {
    type: Object as PropType<{ LinViewUI: { [key: string]: any } }>
  }
};

export default defineComponent({
  name: "LinConfigProvider",
  props: configProviderProps,
  setup(props, context) {
    providerGlobalConfig(props);
    return () => renderSlot(context.slots, "default", { config: props });
  }
});
