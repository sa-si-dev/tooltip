import { Utils, DomUtils } from './utils';
import { Popper } from './popper';

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
 * @property {boolean} [hideArrowIcon=false] - Hide arrow icon in the tooltip
 * @property {string} [additionalClasses] - Additional classes for tooltip which could be used to customize tooltip in CSS
 */
(function () {
  if (window.tooltipComponentInitiated) {
    return;
  } else {
    window.tooltipComponentInitiated = true;
  }

  let $body;
  let $popperEle;
  let $triggerEle;
  let $arrowEle;
  let options = {};
  let popper;

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
    if ($triggerEle) {
      return;
    }

    let target = e.target.closest('[data-tooltip]');

    if (!target) {
      return;
    }

    $triggerEle = target;

    showTooltip();
  }

  function onMouseOut(e) {
    if (!$triggerEle) {
      return;
    }

    let target = e.relatedTarget;

    while (target) {
      if (target === $triggerEle) {
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

  function showTooltip() {
    if (!$triggerEle) {
      return;
    }

    let convertToBoolean = Utils.convertToBoolean;
    let dataset = $triggerEle.dataset;

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
      hideArrowIcon: convertToBoolean(dataset.tooltipHideArrowIcon),
      alignment: dataset.tooltipAlignment || 'left',
      maxWidth: dataset.tooltipMaxWidth || '300px',
      additionalClasses: dataset.tooltipAdditionalClasses,
    };

    if (!options.tooltip || isTooltipDisabled()) {
      return;
    }

    removeTooltip();
    renderTooltip();
    initPopper();
  }

  function renderTooltip() {
    let classNames = 'tooltip-comp';

    if (options.hideArrowIcon) {
      classNames += ' hide-arrow-icon';
    }

    if (options.additionalClasses) {
      classNames += ' ' + options.additionalClasses;
    }

    let html = `<div class="${classNames}">
        <i class="tooltip-comp-arrow"></i>
        <div class="tooltip-comp-content"></div>
      </div>`;

    $body.insertAdjacentHTML('beforeend', html);

    let setStyle = DomUtils.setStyle;
    $popperEle = document.querySelector('.tooltip-comp');
    $arrowEle = $popperEle.querySelector('.tooltip-comp-arrow');
    let $popperContent = $popperEle.querySelector('.tooltip-comp-content');

    if (options.allowHtml) {
      $popperContent.innerHTML = options.tooltip;
    } else {
      $popperContent.innerText = options.tooltip;
    }

    setStyle($popperEle, 'zIndex', options.zIndex);
    setStyle($popperEle, 'fontSize', options.fontSize);
    setStyle($popperEle, 'textAlign', options.alignment);
    setStyle($popperEle, 'maxWidth', options.maxWidth);
  }

  function hideTooltip() {
    if (!$popperEle && !$triggerEle) {
      return;
    }

    hidePopper();

    $triggerEle = null;
  }

  function removeTooltip() {
    if ($popperEle) {
      $popperEle.remove();
    }
  }

  function isTooltipDisabled() {
    return options.ellipsisOnly && !DomUtils.hasEllipsis($triggerEle);
  }

  function initPopper() {
    let data = {
      $popperEle,
      $triggerEle,
      $arrowEle,
      position: options.position,
      margin: options.margin,
      enterDelay: options.enterDelay,
      exitDelay: options.exitDelay,
      showDuration: options.showDuration,
      hideDuration: options.hideDuration,
      transitionDistance: options.transitionDistance,
      zIndex: options.zIndex,
    };

    popper = new Popper(data);
    popper.show();
  }

  function hidePopper() {
    if (popper) {
      popper.hide();
    }
  }
})();
