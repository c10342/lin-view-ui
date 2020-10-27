import MessageBox from './src/message-box.js'

MessageBox.install = Vue=>(Vue.prototype.$MessageBox = MessageBox);


export default MessageBox