/**
 * 检查目标元素是否为输入类型元素
 */
export function isTargetInputElement(target: HTMLElement): boolean {
  if (!target) return false;

  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.contentEditable === 'true' ||
    target.closest('.codemirror') !== null ||
    target.closest('[contenteditable="true"]') !== null ||
    target.closest('input') !== null ||
    target.closest('textarea') !== null ||
    target.closest('p-select') !== null ||
    target.closest('p-multiselect') !== null ||
    target.closest('.p-dropdown') !== null ||
    target.closest('.p-multiselect') !== null ||
    target.closest('[role="listbox"]') !== null ||
    target.closest('[role="option"]') !== null ||
    target.closest('ag-grid-angular') !== null ||
    target.closest('.p-colorpicker') !== null ||
    target.closest('.p-inputnumber') !== null ||
    target.closest('.p-calendar') !== null ||
    target.closest('.p-cascadeselect') !== null ||
    target.closest('.p-treeselect') !== null ||
    target.closest('[data-pc-section="panel"]') !== null
  );
}
