export class DomUtils {
  static hasEllipsis($ele) {
    if (!$ele) {
      return false;
    }

    return $ele.scrollWidth > $ele.offsetWidth;
  }

  static setStyle($ele, name, value) {
    if (!$ele) {
      return;
    }

    $ele.style[name] = value;
  }

  static getScrollableParents($ele) {
    if (!$ele) {
      return [];
    }

    let $scrollableElems = [window];
    let $parent = $ele.parentElement;

    while ($parent) {
      let overflowValue = getComputedStyle($parent).overflow;

      if (overflowValue.indexOf('scroll') !== -1 || overflowValue.indexOf('auto') !== -1) {
        $scrollableElems.push($parent);
      }

      $parent = $parent.parentElement;
    }

    return $scrollableElems;
  }
}
