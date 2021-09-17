
(() => {
    let popWrap = null;
    let inputInterval = null;
    function afterForWard(btn) {
        btn.click();
        const footer = $(btn).parents('article').children('footer').find('.woo-box-item-flex:first-child').find('.woo-box-flex');
        firePageEvent(footer, 'click');
    }
    function forward(e) {
        $(popWrap).children('div').get(1).click();
        e.stopPropagation();
        inputInterval = setInterval(() => {
            const input = document.querySelector('textarea[placeholder="说说分享心得"]');
            if (input) {
                clearInterval(inputInterval);
                setInputValue(input, e.target.innerText + input.value);
                const sendBtns = document.querySelectorAll('.woo-button-flat');
                sendBtns.forEach(btn => {
                    if (btn.innerText === '转发'){
                        setTimeout(() => {
                            afterForWard(btn);
                        }, 1000);
                    }
                })
            }
        }, 500);
    }
    function addText(e) {
        if (e.keyCode === 13) {
            const oldTexts = JSON.parse(window.localStorage.getItem('texts') || '[]');
            window.localStorage.setItem('texts', JSON.stringify(oldTexts.concat([e.target.value])))
            createBtn();
        }
    }

    function createBtn() {
        for (const btn of popWrap.querySelectorAll('.custom')) {
            btn.remove();
        }
        const texts = JSON.parse(window.localStorage.getItem('texts') || '[]');
        texts.forEach(text => {
            const customBtn = document.createElement('div');
            customBtn.className = 'woo-box-flex woo-box-alignCenter woo-pop-item-main custom';
            customBtn.setAttribute('role', 'button');
            customBtn.innerHTML = text;
            customBtn.addEventListener('click', forward);
            popWrap.append(customBtn);
        });
        const input = document.createElement('input');
        input.className = 'custom';
        input.style = 'height: 20px; border-radius: 4px; border: 1px solid #ddd;';
        input.addEventListener('click', (e) => e.stopPropagation());
        input.addEventListener('keydown', addText);
        popWrap.append(input);
        input.focus();
    }
    function observerCallback() {
        popWrap = document.querySelector('.woo-pop-up .woo-pop-wrap-main');
        const customWrap = popWrap?.getAttribute('custom-wrap') === 'true';
        if (!popWrap || customWrap) return;
        popWrap.setAttribute('custom-wrap', 'true');
        createBtn()
    }
    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, { childList: true, subtree: true });
})();