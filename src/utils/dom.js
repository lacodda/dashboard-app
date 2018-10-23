import isFunction from 'lodash/isFunction';

/**
 * Matches selector to parent elements
 *
 * @export
 * @param {*} el
 * @param {*} selector
 * @param {*} baseNode
 * @returns
 */
export default function matchesSelectorToParentElements(
  el,
  selector,
  baseNode,
) {
  let node = el;

  const matchesSelectorFunc = [
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector',
  ].find(func => isFunction(node[func]));

  if (!isFunction(node[matchesSelectorFunc])) return false;

  do {
    if (node[matchesSelectorFunc](selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}