// css bem 规范
// block：区块   element：元素   modifier：修饰符
// z-button
// z-button__element
// z-button__element--disabled
// is-checked is-enabled

// :class=[bem.b()]

// eslint-disable-next-line no-underscore-dangle
function _bem(
  prefixName: string,
  block: string,
  element: string,
  modifier: string
) {
  if (block) {
    prefixName += `-${block}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}

function createBEM(prefixName: string) {
  const getValue = (flag: any, value: string) => {
    return flag ? value : "";
  };

  const b = (block = "") => _bem(prefixName, block, "", "");
  const e = (element = "") =>
    getValue(element, _bem(prefixName, "", element, ""));
  const m = (modifier = "") =>
    getValue(modifier, _bem(prefixName, "", "", modifier));
  const be = (block = "", element = "") =>
    getValue(block && element, _bem(prefixName, block, element, ""));
  const bm = (block = "", modifier = "") =>
    getValue(block && modifier, _bem(prefixName, block, "", modifier));
  const em = (element = "", modifier = "") =>
    getValue(element && modifier, _bem(prefixName, "", element, modifier));
  const bem = (block = "", element = "", modifier = "") =>
    getValue(
      block && element && modifier,
      _bem(prefixName, block, element, modifier)
    );
  const is = (name: string, state: any) => getValue(state, `is-${name}`);
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is
  };
}

// const bem = createNamespace("button");
// bem.b() => z-button , bem.b('block') => z-button-block
// bem.e('element') => z-button__element
// bem.m('modifier') => z-button--modifier
// bem.be('block','element') => z-button-block__element
// bem.bm('block','modifier') => z-button-block--modifier
// bem.em('element','modifier') => z-button__element--modifier
// bem.bem('block','element','modifier') => z-button-block__element--modifier
// bem.is('active',true) => is-active

export function createNamespace(name: string) {
  const prefixName = `z-${name}`;
  return createBEM(prefixName);
}
