function broadcast(options) {

    const {eventName, params, componentName} = options

    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent) {
        if (componentName) {
            if (name === componentName) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
            
        } else {
            parent.$emit.apply(parent, [eventName].concat(params));
        }
        parent = parent.$parent
        name = parent?.$options.name;
    }
}

export default broadcast