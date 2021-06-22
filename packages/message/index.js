import Message from "./src/message.js";

Message.install = Vue => {
  Vue.prototype.$Message = Message;
};

export default Message;
