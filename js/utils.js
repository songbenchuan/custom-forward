function setInputValue(targetEle, value) {
    $(targetEle).val(value);
    const evtObj = document.createEvent('UIEvents');
    evtObj.initUIEvent('input', true, true);
    targetEle.dispatchEvent(evtObj)
}
function firePageEvent(elt, evt) {
    const ev = document.createEvent("HTMLEvents");
    ev.initEvent(evt, true, true);
    elt && elt.get(0).dispatchEvent(ev);
}