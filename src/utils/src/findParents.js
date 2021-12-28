export default function findParents(context, componentName) {
  const parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
    }
    return parents.concat(findParents(parent, componentName));
  } else {
    return [];
  }
}
