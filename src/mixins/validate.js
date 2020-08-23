
import broadcast from 'src/utils/broadcast.js'

const validate = {
    created(){
        this.$on('input',()=>{
            broadcast.call(this,{eventName:'validate',componentName:'LinFormItem'})
        })
    }
}

export default validate