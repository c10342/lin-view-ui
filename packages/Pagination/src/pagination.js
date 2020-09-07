// import Pagination from './pagination.vue'

import "./style.scss";

// export default Pagination

export default {
  name: "LinPagination",
  props: {
    pageCount: {
      default: 7,
      type: Number,
    },
    pageSize: {
      default: 10,
      type: Number,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageIndex: {
      type: Number,
    },
    background: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: "prev, pager, next, jumper,total",
    },
  },
  data() {
    return {
      myPageIndex: 1,
    };
  },
  render() {
    const { background, layoutList } = this;
    return (
      <div
        class={["lin-pagination", { "lin-pagination-background": background }]}
      >
        {layoutList.map((fnstr) => {
          const fn = this[`render${fnstr}`];
          return fn ? fn() : null;
        })}
      </div>
    );
  },
  methods: {
    onItemClick(data) {
      let index = 1;
      if (data.type === "number") {
        index = data.index;
      } else if (data.type === "prev") {
        index = this.currentPage - 1;
      } else if (data.type === "next") {
        index = this.currentPage + 1;
      }
      this.currentPage = index;
      this.$emit("currentChange", index);
    },
    prevClick() {
      if (this.disabledPrev) {
        return;
      }
      const index = this.currentPage - 1;
      this.currentPage = index;
      this.$emit("prevClick", index);
    },
    nextClick() {
      if (this.disabledNext) {
        return;
      }
      const index = this.currentPage + 1;
      this.currentPage = index;
      this.$emit("nextClick", index);
    },
    gotoPageByEnter(e) {
      if (e.keyCode !== 13) {
        return;
      }
      const value = e.target.value;
      let index;
      if (!value) {
        index = 1;
      } else {
        if (value < 1) {
          index = 1;
        } else if (value > this.totalPage) {
          index = this.totalPage;
        } else {
          index = value;
        }
      }
      this.currentPage = index * 1;
      e.target.value = index;
    },
    gotoPageByBlur(e) {
      const value = e.target.value;
      let index;
      if (!value) {
        index = 1;
      } else {
        if (value < 1) {
          index = 1;
        } else if (value > this.totalPage) {
          index = this.totalPage;
        } else {
          index = value;
        }
      }
      this.currentPage = index * 1;
      e.target.value = index;
    },
    rendertotal() {
      const { total } = this;
      return <span class="lin-pagination-total">共{total}条</span>;
    },
    renderprev() {
      const { disabledPrev, prevClick } = this;
      return (
        <span
          class={[
            "lin-pagination-item",
            "lin-icon-left",
            { "lin-pagination-disabled": disabledPrev },
          ]}
          onClick={prevClick}
        ></span>
      );
    },
    renderpager() {
      const { pageList, currentPage, onItemClick } = this;
      return (
        <ul class="lin-pagination-pager">
          {pageList.map((item, index) => {
            return (
              <li
                class={[
                  "lin-pagination-item",
                  { "lin-pagination-active": item.index === currentPage },
                  {
                    "lin-pagination-ellipsis":
                      item.type === "prev" || item.type === "next",
                  },
                ]}
                key={index}
                onClick={() => onItemClick(item)}
              >
                {item.index}
                {item.type === "prev" ? (
                  <span class="lin-pagination-icon lin-icon-leftarrow"></span>
                ) : null}
                {item.type === "next" ? (
                  <span class="lin-pagination-icon lin-icon-rightarrow"></span>
                ) : null}
              </li>
            );
          })}
        </ul>
      );
    },
    rendernext() {
      const { disabledNext, nextClick } = this;
      return (
        <span
          class={[
            "lin-pagination-item",
            "lin-icon-right",
            { "lin-pagination-disabled": disabledNext },
          ]}
          onClick={nextClick}
        ></span>
      );
    },
    renderjumper() {
      const { totalPage, gotoPageByEnter, gotoPageByBlur, currentPage } = this;
      return (
        <div class="lin-pagintaion-jumpe">
          <span>前往</span>
          <input
            min="1"
            max={totalPage}
            onKeyup={gotoPageByEnter}
            onBlur={gotoPageByBlur}
            value={currentPage}
            class="lin-pagintaion-input"
            type="number"
          />
          <span>页</span>
        </div>
      );
    },
  },
  computed: {
    currentPage: {
      get() {
        if (this.pageIndex) {
          return this.pageIndex;
        }
        return this.myPageIndex;
      },
      set(val) {
        if (this.pageIndex) {
          this.$emit("update:pageIndex", val);
        } else {
          this.myPageIndex = val;
        }
      },
    },
    disabledPrev() {
      return this.currentPage === 1 || this.total === 0;
    },
    disabledNext() {
      return this.currentPage === this.totalPage || this.total === 0;
    },
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    pageList() {
      if (this.total === 0) {
        return [];
      }
      let left = 1;
      let right = this.totalPage;
      const arr = [];
      if (this.totalPage >= this.pageCount) {
        if (
          this.currentPage > Math.ceil(this.pageCount / 2) &&
          this.currentPage < this.totalPage - Math.floor(this.pageCount / 2)
        ) {
          left = this.currentPage - Math.floor(this.pageCount / 2);
          right = this.currentPage + Math.floor(this.pageCount / 2);
        } else if (this.currentPage <= Math.ceil(this.pageCount / 2)) {
          left = 1;
          right = this.pageCount;
        } else {
          left = this.totalPage - (this.pageCount - 1);
          right = this.totalPage;
        }
      }
      while (left <= right) {
        arr.push({ index: left, type: "number" });
        left++;
      }
      // ellipsis
      if (this.totalPage > this.pageCount) {
        arr[0] = { index: 1, type: "number" };
        if (this.currentPage > Math.ceil(this.pageCount / 2)) {
          arr[1] = { index: "...", type: "prev" };
        }
        if (
          this.currentPage <
          this.totalPage - Math.floor(this.pageCount / 2)
        ) {
          arr[arr.length - 2] = { index: "...", type: "next" };
        }
        arr[arr.length - 1] = { index: this.totalPage, type: "number" };
      }
      return arr;
    },
    layoutList() {
      let splitArr = this.layout.split(",") || [];
      splitArr = splitArr.map((item) => item.trim());
      return splitArr;
    },
  },
};
