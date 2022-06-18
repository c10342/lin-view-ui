import { useScopeLocale } from "@packages/hooks";
import { isNumber } from "@packages/utils";
import { computed, defineComponent, watch } from "vue";
import { keyCode, layoutType } from "./enum";
import LinIcon from "@packages/icon";

export default defineComponent({
  name: "LinPagination",
  components: { LinIcon },
  emits: ["update:pageIndex", "change", "prevClick", "nextClick"],
  props: {
    // 页码按钮的数量，当总页数超过该值时会折叠
    pageCount: {
      default: 7,
      type: Number
    },
    // 每页显示条目个数
    pageSize: {
      default: 10,
      type: Number
    },
    // 总条目数
    total: {
      type: Number,
      default: 0
    },
    // 当前页数
    pageIndex: {
      type: Number,
      required: true
    },
    // 是否为分页按钮添加背景色是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: false
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: "prev, pager, next, jumper,total"
    }
  },
  setup(props, context) {
    // 是否禁用上一个
    const disabledPrev = computed(() => {
      return props.pageIndex === 1 || props.total === 0;
    });
    // 是否禁用下一个
    const disabledNext = computed(() => {
      return props.pageIndex === totalPage.value || props.total === 0;
    });
    // 一共有多少页
    const totalPage = computed(() => {
      return Math.ceil(props.total / props.pageSize);
    });

    // 页码列表
    const pageList = computed(() => {
      if (props.total === 0) {
        return [];
      }
      let left = 1;
      let right = totalPage.value;
      const arr = [];
      if (totalPage.value >= props.pageCount) {
        // 总页数大于页码按钮数量，需要折叠
        if (
          props.pageIndex > Math.ceil(props.pageCount / 2) &&
          props.pageIndex < totalPage.value - Math.floor(props.pageCount / 2)
        ) {
          // 中间完整显示，即 ...1,2,3...
          left = props.pageIndex - Math.floor(props.pageCount / 2);
          right = props.pageIndex + Math.floor(props.pageCount / 2);
        } else if (props.pageIndex <= Math.ceil(props.pageCount / 2)) {
          // 左边完整显示，1,2,3...
          left = 1;
          right = props.pageCount;
        } else {
          // 右边完整显示 ...1,2,3
          left = totalPage.value - (props.pageCount - 1);
          right = totalPage.value;
        }
      }
      while (left <= right) {
        arr.push({ index: left, type: layoutType.number });
        left++;
      }
      // ellipsis
      if (totalPage.value > props.pageCount) {
        // 开始准备省略号
        arr[0] = { index: 1, type: layoutType.number };
        if (props.pageIndex > Math.ceil(props.pageCount / 2)) {
          // 左边需要打点的情况
          arr[1] = { index: "...", type: layoutType.prev };
        }
        if (
          props.pageIndex <
          totalPage.value - Math.floor(props.pageCount / 2)
        ) {
          // 右边需要打点的情况
          arr[arr.length - 2] = { index: "...", type: layoutType.next };
        }
        arr[arr.length - 1] = {
          index: totalPage.value,
          type: layoutType.number
        };
      }
      return arr;
    });

    // 组件排版
    const layoutList = computed(() => {
      let splitArr = props.layout.split(",") || [];
      splitArr = splitArr.map((item) => item.trim());
      return splitArr;
    });

    const emitChange = (index: number) => {
      context.emit("update:pageIndex", index);
      context.emit("change", index);
    };

    // 点击每一项
    const onItemClick = (data: { index: number | string; type: string }) => {
      let index = 1;
      if (data.type === layoutType.number) {
        index = data.index as number;
      } else if (data.type === layoutType.prev) {
        index = props.pageIndex - 1;
      } else if (data.type === layoutType.next) {
        index = props.pageIndex + 1;
      }

      emitChange(index);
    };
    // 点击上一页
    const prevClick = () => {
      if (disabledPrev.value) {
        return;
      }
      const index = props.pageIndex - 1;
      emitChange(index);
      context.emit("prevClick", index);
    };
    // 点击下一页
    const nextClick = () => {
      if (disabledNext.value) {
        return;
      }
      const index = props.pageIndex + 1;
      emitChange(index);
      context.emit("nextClick", index);
    };
    // jumper，用户敲下回车跳转到指定页码，用户敲下回车跳转到指定页码
    const gotoPageByEnter = (e: KeyboardEvent) => {
      if (e.keyCode !== keyCode.enter) {
        return;
      }
      const target = e.target as HTMLInputElement;
      const value: string = target.value;
      let index: number;
      if (!value) {
        index = 1;
      } else if (parseInt(value) < 1) {
        index = 1;
      } else if (parseInt(value) > totalPage.value) {
        index = totalPage.value;
      } else {
        index = parseInt(value);
      }
      emitChange(index);
      target.value = index + "";
    };
    // jumper，输入框失去焦点
    const gotoPageByBlur = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      let index: number;
      if (!value) {
        index = 1;
      } else if (parseInt(value) < 1) {
        index = 1;
      } else if (parseInt(value) > totalPage.value) {
        index = totalPage.value;
      } else {
        index = parseInt(value);
      }
      emitChange(index);
      target.value = index + "";
    };

    const { t } = useScopeLocale("Pagination");

    // total，渲染总页数
    const renderTotal = () => {
      return (
        <span class="lin-pagination-total">
          {t("total")}
          {props.total}
          {t("strip")}
        </span>
      );
    };
    // prev，渲染上一个
    const renderPrev = () => {
      return (
        <LinIcon
          name="left"
          class={["lin-pagination-item", { "is-disabled": disabledPrev.value }]}
          onClick={prevClick}
        />
      );
    };
    // pager，渲染条目
    const renderPager = () => {
      return (
        <ul class="lin-pagination-pager">
          {pageList.value.map((item, index) => (
            <li
              class={[
                "lin-pagination-item",
                { "is-active": item.index === props.pageIndex },
                {
                  "is-ellipsis":
                    item.type === layoutType.prev ||
                    item.type === layoutType.next
                }
              ]}
              key={index}
              onClick={() => onItemClick(item)}
            >
              {item.index}
              {item.type === layoutType.prev ? (
                <LinIcon name="arrowhead-left" class="lin-pagination-icon" />
              ) : null}
              {item.type === layoutType.next ? (
                <LinIcon name="arrowhead-right" class="lin-pagination-icon" />
              ) : null}
            </li>
          ))}
        </ul>
      );
    };
    // next，渲染下一个
    const renderNext = () => {
      return (
        <LinIcon
          name="right"
          class={["lin-pagination-item", { "is-disabled": disabledNext.value }]}
          onClick={nextClick}
        />
      );
    };
    // jumper,渲染跳转至输入框
    const renderJumper = () => {
      return (
        <div class="lin-pagination-jump">
          <span>{t("goto")}</span>
          <input
            min="1"
            max={totalPage.value}
            onKeyup={gotoPageByEnter}
            onBlur={gotoPageByBlur}
            value={props.pageIndex}
            class="lin-pagination-input"
            type="number"
          />
          <span>{t("page")}</span>
        </div>
      );
    };

    const renderLayout: Record<string, Function> = {
      total: renderTotal,
      prev: renderPrev,
      pager: renderPager,
      next: renderNext,
      jumper: renderJumper
    };

    return {
      renderLayout,
      layoutList
    };
  },

  render() {
    const { renderLayout, layoutList, background } = this;

    return (
      <div class={["lin-pagination", { "is-background": background }]}>
        {layoutList.map((fnstr) => {
          const fn = renderLayout[fnstr];
          return fn ? fn() : null;
        })}
      </div>
    );
  }
});
