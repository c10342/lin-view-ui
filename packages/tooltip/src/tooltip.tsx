import {
  computed,
  createVNode,
  CSSProperties,
  defineComponent,
  Ref,
  ref,
  render,
  Transition,
  VNode
} from "vue";
import { placementType } from "./enum";
import { Placement } from "./types";

const createComponent = ({
  show,
  onAfterLeave,
  style,
  text,
  placement
}: {
  show: Ref<boolean>;
  onAfterLeave: (el: Element) => void;
  style: Ref<CSSProperties>;
  text: Ref<string>;
  placement: Ref<Placement>;
}) => {
  const classes = computed(() => {
    return {
      "is-bottom": placement.value === placementType.top,
      "is-top": placement.value === placementType.bottom,
      "is-left": placement.value === placementType.right,
      "is-right": placement.value === placementType.left
    };
  });

  const tooltipComponent = defineComponent({
    render() {
      return (
        <Transition name="lin-fade" onAfterLeave={onAfterLeave}>
          {show.value ? (
            <div style={style.value} class={["lin-tooltip", classes.value]}>
              {text.value}
            </div>
          ) : null}
        </Transition>
      );
    }
  });

  return tooltipComponent;
};

class Tooltip {
  // 样式
  style = ref<CSSProperties>({});

  // 控制是否显示
  show = ref(false);

  // 显示位置
  placement = ref<Placement>("bottom");

  // 文本
  text = ref("");

  private div = document.createElement("div");

  private vm!: VNode;

  get el() {
    return this.vm.el as HTMLElement;
  }

  constructor() {
    this.init();
    this.mounted();
  }

  private init() {
    this.vm = createVNode(
      createComponent({
        style: this.style,
        show: this.show,
        placement: this.placement,
        text: this.text,
        onAfterLeave: this.destroySelf.bind(this)
      })
    );
    render(this.vm, this.div);
  }

  private mounted() {
    document.body.appendChild(this.vm.el as HTMLElement);
  }

  private destroySelf() {
    render(null, this.div);
  }
}

export default Tooltip;
