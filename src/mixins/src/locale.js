import { t } from "@lin-view-ui/locale";

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
