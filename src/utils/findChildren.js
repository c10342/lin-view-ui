export default function findChildren(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const children = findChildren(child, componentName);
    return components.concat(children);
  }, []);
}
