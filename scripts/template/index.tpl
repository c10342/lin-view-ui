import {{importName}} from './src/{{name}}.vue';

{{importName}}.install = (Vue) => Vue.component({{importName}}.name, {{importName}});

export default {{importName}};
