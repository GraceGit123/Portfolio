/* Shared Safari/iPadOS compatibility: loaded before either page's application. */
(function () {
  var root = document.documentElement;
  var probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;visibility:hidden;display:flex;flex-direction:column;row-gap:1px';
  probe.appendChild(document.createElement('div'));
  probe.appendChild(document.createElement('div'));
  document.body.appendChild(probe);
  if (probe.scrollHeight !== 1) root.classList.add('no-flex-gap');
  probe.remove();
  if (root.classList.contains('no-flex-gap')) {
    var adjusted = [], scheduled = false;
    function applyFlexGaps() {
      scheduled = false;
      adjusted.forEach(function (item) { item.element.style[item.property] = item.original; });
      adjusted = [];
      Array.prototype.forEach.call(document.querySelectorAll('body *'), function (container) {
        var style = getComputedStyle(container);
        if (style.display !== 'flex' && style.display !== 'inline-flex') return;
        var column = style.flexDirection.indexOf('column') === 0;
        var gap = parseFloat(column ? style.rowGap : style.columnGap) || 0;
        if (!gap) return;
        var children = Array.prototype.filter.call(container.children, function (child) {
          var cs = getComputedStyle(child);
          return cs.display !== 'none' && cs.position !== 'absolute' && cs.position !== 'fixed';
        });
        var property = column ? 'marginBottom' : 'marginRight';
        if (style.flexDirection.indexOf('reverse') !== -1) property = column ? 'marginTop' : 'marginLeft';
        children.slice(0, -1).forEach(function (child) {
          var current = getComputedStyle(child)[property];
          if (current === 'auto') return;
          adjusted.push({ element: child, property: property, original: child.style[property] });
          child.style[property] = ((parseFloat(current) || 0) + gap) + 'px';
        });
      });
    }
    function scheduleGaps() { if (!scheduled) { scheduled = true; requestAnimationFrame(applyFlexGaps); } }
    new MutationObserver(function (mutations) {
      if (mutations.some(function (mutation) {
        return Array.prototype.some.call(mutation.addedNodes, function (node) { return node.nodeType === 1; }) ||
          Array.prototype.some.call(mutation.removedNodes, function (node) { return node.nodeType === 1; });
      })) scheduleGaps();
    }).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', scheduleGaps);
    if (document.fonts) document.fonts.ready.then(scheduleGaps);
    scheduleGaps();
  }
  var nativeDialog = typeof window.HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal === 'function';
  window.installPortfolioDialog = function (dialog) { if (dialog && !nativeDialog) install(dialog); };
  if (nativeDialog) return;
  root.classList.add('no-native-dialog');
  var installed = [];
  function install(dialog) {
    if (installed.indexOf(dialog) !== -1) return;
    installed.push(dialog);
    var backdrop, previousFocus, previousOverflow;
    Object.defineProperty(dialog, 'open', { configurable: true, get: function () { return dialog.hasAttribute('open'); } });
    function focusable() {
      return Array.prototype.filter.call(dialog.querySelectorAll('button,a[href],input,textarea,select,[tabindex]'), function (e) { return !e.disabled && e.tabIndex >= 0 && e.getClientRects().length; });
    }
    dialog.showModal = function () {
      if (dialog.open) return;
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      backdrop = document.createElement('div');
      backdrop.className = 'dialog-fallback-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', function () { dialog.close(); });
      dialog.setAttribute('open', '');
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';
      var controls = focusable();
      if (controls.length) controls[0].focus();
    };
    dialog.close = function () {
      if (!dialog.open) return;
      dialog.removeAttribute('open');
      dialog.removeAttribute('aria-modal');
      if (backdrop) backdrop.remove();
      document.body.style.overflow = previousOverflow || '';
      dialog.dispatchEvent(new Event('close'));
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
    dialog.addEventListener('keydown', function (event) {
      if (!dialog.open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        var cancel = new Event('cancel', { cancelable: true });
        if (dialog.dispatchEvent(cancel)) dialog.close();
      }
      if (event.key === 'Tab') {
        var items = focusable();
        if (!items.length) { event.preventDefault(); return; }
        var first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }
  function scan() { Array.prototype.forEach.call(document.querySelectorAll('dialog'), install); }
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
}());
