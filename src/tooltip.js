/**
 * Available data attributes (data-tooltip-*)
 * @property {string} tooltip - Text to show (data-tooltip="")
 * @property {string} [position=auto] - Position of tooltip (top, bottom, left, right, auto)
 * @property {string} [fontSize=14px] - Text font size
 * @property {number} [margin=4] - Space between tooltip and its activator (in pixel)
 * @property {number} [enterDelay=0] - Delay time before showing tooltip (in milliseconds)
 * @property {number} [exitDelay=0] - Delay time before hiding tooltip (in milliseconds)
 * @property {number} [showDuration=300] - Transition duration for show animation (in milliseconds)
 * @property {number} [hideDuration=200] - Transition duration for hide animation (in milliseconds)
 * @property {number} [transitionDistance=10] - Distance to translate on show/hide animation (in pixel)
 * @property {number} [zIndex=1] - CSS z-index value for tooltip
 * @property {boolean} [ellipsisOnly=false] - Show the tooltip only if element text is partially hidden with ellipsis
 * @property {boolean} [allowHtml=false] - Allow html elements in the tooltip text
 * @property {string} [alignment=left] - CSS text-align value
 * @property {string} [maxWidth=300px] - CSS max-width for tootltip box
 * @property {boolean} [hideOnClick=true] - Hide tooltip on clicking the element
 */
(function () {
  if (window.tooltipComponentInitiated) {
    return;
  } else {
    window.tooltipComponentInitiated = true;
  }

  let $body;
  let $tooltip;
  let $currentEle;
  let options = {};
  let enterDelayTimeout;
  let exitDelayTimeout;
  let hideDurationTimeout;

  window.addEventListener('load', initTooltip);
  
  function initTooltip() {
    $body = document.querySelector('body');

    addEvents();
  }

  /** event methods - start */
  function addEvents() {
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('click', onClick);
  }

  function onMouseOver(e) {
    if ($currentEle) {
      return;
    }

    let target = e.target.closest('[data-tooltip]');

    if (!target) {
      return;
    }

    $currentEle = target;
    showTooltip();
  }

  function onMouseOut(e) {
    if (!$currentEle) {
      return;
    }

    let target = e.relatedTarget;

    while (target) {
      if (target === $currentEle) {
        return;
      }

      target = target.parentNode;
    }

    hideTooltip();
  }

  function onTouchMove() {
    hideTooltip();
  }

  function onClick() {
    if (options.hideOnClick) {
      hideTooltip();
    }
  }
  /** event methods - end */

  function renderTooltip() {
    $body.insertAdjacentHTML('beforeend', '<div class="tooltip-box"></div>');

    $tooltip = document.querySelector('.tooltip-box');

    if (options.allowHtml) {
      $tooltip.innerHTML = options.tooltip;
    } else {
      $tooltip.innerText = options.tooltip;
    }

    setStyle($tooltip, 'zIndex', options.zIndex);
    setStyle($tooltip, 'fontSize', options.fontSize);
    setStyle($tooltip, 'textAlign', options.alignment);
    setStyle($tooltip, 'maxWidth', options.maxWidth);
  }

  function setPosition() {
    let viewportWidth = window.innerWidth;
    let currentEleCoords = getCoords($currentEle);
    let tooltipCoords = getCoords($tooltip);
    let left = currentEleCoords.left;
    let top = currentEleCoords.top;
    let tooltipWidth = tooltipCoords.width;
    let tooltipHeight = tooltipCoords.height;
    let parentWidth = currentEleCoords.width;
    let parentHeight = currentEleCoords.height;
    let position = options.position;
    let widthCenter = parentWidth / 2 - tooltipWidth / 2;
    let heightCenter = parentHeight / 2 - tooltipHeight / 2;
    let margin = options.margin;
    let transitionDistance = options.transitionDistance;
    let fromTop;
    let fromLeft;

    if (position === 'auto') {
      let moreVisibleSides = getMoreVisibleSides($currentEle);
      position = moreVisibleSides.vertical;
    }

    if (position === 'top') {
      top = top - tooltipHeight - margin;
      left = left + widthCenter;
    } else if (position === 'right') {
      top = top + heightCenter;
      left = left + parentWidth + margin;
    } else if (position === 'left') {
      top = top + heightCenter;
      left = left - tooltipWidth - margin;
    } else {
      top = top + parentHeight + margin;
      left = left + widthCenter;
    }

    /* if tooltip is hiding in left edge */
    if (left < 0) {
      left = 0;
    } else if (left + tooltipWidth > viewportWidth) {
      /* if tooltip is hiding in right edge */
      left = viewportWidth - tooltipWidth;
    }

    if (position === 'top') {
      fromTop = top + transitionDistance;
      fromLeft = left;
    } else if (position === 'right') {
      fromTop = top;
      fromLeft = left - transitionDistance;
    } else if (position === 'left') {
      fromTop = top;
      fromLeft = left + transitionDistance;
    } else {
      fromTop = top - transitionDistance;
      fromLeft = left;
    }

    let transformText = `translate3d(${fromLeft}px, ${fromTop}px, 0)`;

    setStyle($tooltip, 'transform', transformText);
    setData($tooltip, 'fromLeft', fromLeft);
    setData($tooltip, 'fromTop', fromTop);
    setData($tooltip, 'top', top);
    setData($tooltip, 'left', left);

    /** calling below method to force redraw */
    getCoords($tooltip);
  }

  function showTooltip() {
    if (!$currentEle) {
      return;
    }

    let dataset = $currentEle.dataset;
    options = {
      tooltip: dataset.tooltip,
      position: dataset.tooltipPosition || 'auto',
      zIndex: parseFloat(dataset.tooltipZIndex) || 1,
      enterDelay: parseFloat(dataset.tooltipEnterDelay) || 0,
      exitDelay: parseFloat(dataset.tooltipExitDelay) || 0,
      fontSize: dataset.tooltipFontSize || '14px',
      margin: parseFloat(dataset.tooltipMargin) || 4,
      showDuration: parseFloat(dataset.tooltipShowDuration) || 300,
      hideDuration: parseFloat(dataset.tooltipHideDuration) || 200,
      transitionDistance: parseFloat(dataset.tooltipTransitionDistance) || 10,
      ellipsisOnly: convertToBoolean(dataset.tooltipEllipsisOnly),
      allowHtml: convertToBoolean(dataset.tooltipAllowHtml),
      hideOnClick: convertToBoolean(dataset.tooltipHideOnClick, true),
      alignment: dataset.tooltipAlignment || 'left',
      maxWidth: dataset.tooltipMaxWidth || '300px',
    };

    options.position = options.position.toLowerCase();

    if (!options.tooltip || isTooltipDisabled()) {
      return;
    }

    removeTooltip();
    renderTooltip();
    setPosition();
    clearTimeout(exitDelayTimeout);
    clearTimeout(hideDurationTimeout);

    enterDelayTimeout = setTimeout(() => {
      let left = getData($tooltip, 'left');
      let top = getData($tooltip, 'top');
      let transformText = `translate3d(${left}px, ${top}px, 0)`;

      setStyle($tooltip, 'transitionDuration', options.showDuration + 'ms');
      setStyle($tooltip, 'transform', transformText);
      setStyle($tooltip, 'opacity', 1);
    }, options.enterDelay);
  }

  function hideTooltip() {
    if (!$tooltip && !$currentEle) {
      return;
    }

    clearTimeout(enterDelayTimeout);

    exitDelayTimeout = setTimeout(() => {
      if ($tooltip) {
        let left = getData($tooltip, 'fromLeft');
        let top = getData($tooltip, 'fromTop');
        let transformText = `translate3d(${left}px, ${top}px, 0)`;
        let hideDuration = options.hideDuration;

        setStyle($tooltip, 'transitionDuration', hideDuration + 'ms');
        setStyle($tooltip, 'transform', transformText);
        setStyle($tooltip, 'opacity', 0);

        hideDurationTimeout = setTimeout(() => {
          removeTooltip();
        }, hideDuration);
      }
    }, options.exitDelay);

    $currentEle = null;
  }

  function removeTooltip() {
    if ($tooltip) {
      $tooltip.remove();
    }
  }

  function isTooltipDisabled() {
    return options.ellipsisOnly && !hasEllipsis($currentEle);
  }

  /** helper methods - start */
  function setStyle($ele, name, value) {
    if (!$ele) {
      return;
    }

    $ele.style[name] = value;
  }

  function setData($ele, name, value) {
    if (!$ele) {
      return;
    }

    $ele.dataset[name] = value;
  }

  function getData($ele, name, type) {
    let value = $ele ? $ele.dataset[name] : '';

    if (type === 'number') {
      value = parseFloat(value) || 0;
    } else {
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
    }

    return value;
  }

  function getCoords($ele) {
    if (!$ele) {
      return;
    }

    let box = $ele.getBoundingClientRect();
    let pageX = window.pageXOffset;
    let pageY = window.pageYOffset;

    return {
      width: box.width,
      height: box.height,
      top: box.top + pageY,
      right: box.right + pageX,
      bottom: box.bottom + pageY,
      left: box.left + pageX,
    };
  }

  function getMoreVisibleSides($ele) {
    if (!$ele) {
      return {};
    }

    let box = $ele.getBoundingClientRect();
    let availableWidth = window.innerWidth;
    let availableHeight = window.innerHeight;
    let leftArea = box.left;
    let topArea = box.top;
    let rightArea = availableWidth - leftArea - box.width;
    let bottomArea = availableHeight - topArea - box.height;
    let horizontal = leftArea > rightArea ? 'left' : 'right';
    let vertical = topArea > bottomArea ? 'top' : 'bottom';

    return {
      horizontal,
      vertical,
    };
  }

  function hasEllipsis($ele) {
    if (!$ele) {
      return false;
    }

    return $ele.scrollWidth > $ele.offsetWidth;
  }

  function convertToBoolean(value, defaultValue = false) {
    if (value === true || value === 'true') {
      value = true;
    } else if (value === false || value === 'false') {
      value = false;
    } else {
      value = defaultValue;
    }

    return value;
  }
  /** helper methods - end */
})();
