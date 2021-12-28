import { t } from "@src/locale";

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
