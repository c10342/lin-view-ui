
import {LocaleMixin} from '@lin-view-ui/mixins';


export default {
  name: 'LinPagination',
  mixins: [LocaleMixin],
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
    // 当前页数，支持 .sync 修饰符
    pageIndex: {
      type: Number
    },
    // 是否为分页按钮添加背景色是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: false
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'prev, pager, next, jumper,total'
    }
  },
  data() {
    return {
      // 当前页数,当用户没有传pageIndex时也能使用
      myPageIndex: 1
    };
  },
  render(h) {
    const { background, layoutList } = this;
    return (
      <div
        class={['lin-pagination', { 'lin-pagination-background': background }]}
      >
        {layoutList.map((fnstr) => {
          const fn = this[`render${fnstr}`];
          return fn ? fn(h) : null;
        })}
      </div>
    );
  },
  methods: {
    // 点击每一项
    onItemClick(data) {
      let index = 1;
      if (data.type === 'number') {
        index = data.index;
      } else if (data.type === 'prev') {
        index = this.currentPage - 1;
      } else if (data.type === 'next') {
        index = this.currentPage + 1;
      }
      this.currentPage = index;
      this.$emit('currentChange', index);
    },
    // 点击上一页
    prevClick() {
      if (this.disabledPrev) {
        return;
      }
      const index = this.currentPage - 1;
      this.currentPage = index;
      this.$emit('prevClick', index);
    },
    // 点击下一页
    nextClick() {
      if (this.disabledNext) {
        return;
      }
      const index = this.currentPage + 1;
      this.currentPage = index;
      this.$emit('nextClick', index);
    },
    // jumper，用户敲下回车跳转到指定页码，用户敲下回车跳转到指定页码
    gotoPageByEnter(e) {
      if (e.keyCode !== 13) {
        return;
      }
      const value = e.target.value;
      let index;
      if (!value) {
        index = 1;
      } else if (value < 1) {
        index = 1;
      } else if (value > this.totalPage) {
        index = this.totalPage;
      } else {
        index = value;
      }
      this.currentPage = index * 1;
      e.target.value = index;
    },
    // jumper，输入框失去焦点
    gotoPageByBlur(e) {
      const value = e.target.value;
      let index;
      if (!value) {
        index = 1;
      } else if (value < 1) {
        index = 1;
      } else if (value > this.totalPage) {
        index = this.totalPage;
      } else {
        index = value;
      }
      this.currentPage = index * 1;
      e.target.value = index;
    },
    // total，渲染总页数
    rendertotal(h) {
      const { total, t } = this;
      return (
        <span class="lin-pagination-total">
          {t('LinViewUI.Pagination.total')}
          {total}
          {t('LinViewUI.Pagination.strip')}
        </span>
      );
    },
    // prev，渲染上一个
    renderprev(h) {
      const { disabledPrev, prevClick } = this;
      return (
        <span
          class={[
            'lin-pagination-item',
            'lin-icon-left',
            { 'lin-pagination-disabled': disabledPrev }
          ]}
          onClick={prevClick}
        ></span>
      );
    },
    // pager，渲染条目
    renderpager(h) {
      const { pageList, currentPage, onItemClick } = this;
      return (
        <ul class="lin-pagination-pager">
          {pageList.map((item, index) => (
            <li
              class={[
                'lin-pagination-item',
                { 'lin-pagination-active': item.index === currentPage },
                {
                  'lin-pagination-ellipsis':
                    item.type === 'prev' || item.type === 'next'
                }
              ]}
              key={index}
              onClick={() => onItemClick(item)}
            >
              {item.index}
              {item.type === 'prev' ? (
                <span class="lin-pagination-icon lin-icon-leftarrow"></span>
              ) : null}
              {item.type === 'next' ? (
                <span class="lin-pagination-icon lin-icon-rightarrow"></span>
              ) : null}
            </li>
          ))}
        </ul>
      );
    },
    // next，渲染下一个
    rendernext(h) {
      const { disabledNext, nextClick } = this;
      return (
        <span
          class={[
            'lin-pagination-item',
            'lin-icon-right',
            { 'lin-pagination-disabled': disabledNext }
          ]}
          onClick={nextClick}
        ></span>
      );
    },
    // jumper,渲染跳转至输入框
    renderjumper(h) {
      const {
        totalPage,
        gotoPageByEnter,
        gotoPageByBlur,
        currentPage,
        t
      } = this;
      return (
        <div class="lin-pagintaion-jumpe">
          <span>{t('LinViewUI.Pagination.goto')}</span>
          <input
            min="1"
            max={totalPage}
            onKeyup={gotoPageByEnter}
            onBlur={gotoPageByBlur}
            value={currentPage}
            class="lin-pagintaion-input"
            type="number"
          />
          <span>{t('LinViewUI.Pagination.page')}</span>
        </div>
      );
    }
  },
  computed: {
    // 当前页码
    currentPage: {
      get() {
        if (this.pageIndex) {
          return this.pageIndex;
        }
        return this.myPageIndex;
      },
      set(val) {
        if (this.pageIndex) {
          this.$emit('update:pageIndex', val);
        } else {
          this.myPageIndex = val;
        }
      }
    },
    // 是否禁用上一个
    disabledPrev() {
      return this.currentPage === 1 || this.total === 0;
    },
    // 是否禁用下一个
    disabledNext() {
      return this.currentPage === this.totalPage || this.total === 0;
    },
    // 一共有多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 页码列表
    pageList() {
      if (this.total === 0) {
        return [];
      }
      let left = 1;
      let right = this.totalPage;
      const arr = [];
      if (this.totalPage >= this.pageCount) {
        // 总页数大于页码按钮数量，需要折叠
        if (
          this.currentPage > Math.ceil(this.pageCount / 2) &&
          this.currentPage < this.totalPage - Math.floor(this.pageCount / 2)
        ) {
          // 中间完整显示，即 ...1,2,3...
          left = this.currentPage - Math.floor(this.pageCount / 2);
          right = this.currentPage + Math.floor(this.pageCount / 2);
        } else if (this.currentPage <= Math.ceil(this.pageCount / 2)) {
          // 左边完整显示，1,2,3...
          left = 1;
          right = this.pageCount;
        } else {
          // 右边完整显示 ...1,2,3
          left = this.totalPage - (this.pageCount - 1);
          right = this.totalPage;
        }
      }
      while (left <= right) {
        arr.push({ index: left, type: 'number' });
        left++;
      }
      // ellipsis
      if (this.totalPage > this.pageCount) {
        // 开始准备省略号
        arr[0] = { index: 1, type: 'number' };
        if (this.currentPage > Math.ceil(this.pageCount / 2)) {
          // 左边需要打点的情况
          arr[1] = { index: '...', type: 'prev' };
        }
        if (
          this.currentPage <
          this.totalPage - Math.floor(this.pageCount / 2)
        ) {
          // 右边需要打点的情况
          arr[arr.length - 2] = { index: '...', type: 'next' };
        }
        arr[arr.length - 1] = { index: this.totalPage, type: 'number' };
      }
      return arr;
    },
    // 组件排版
    layoutList() {
      let splitArr = this.layout.split(',') || [];
      splitArr = splitArr.map((item) => item.trim());
      return splitArr;
    }
  }
};
