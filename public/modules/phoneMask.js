function setCursorPosition (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select()
    }
}

function mask (event) {
    const matrix = '+7 (___) ___ ____';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    let val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
        val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
    });
    if (event.type === 'blur') {
        if (this.value.length === 2) {
            this.value = '';
        }
    } else {
        setCursorPosition(this.value.length, this);
    }
}

export function maskPhone (inputPhone) {
    inputPhone.addEventListener('input', mask, false);
    inputPhone.addEventListener('focus', mask, false);
    inputPhone.addEventListener('blur', mask, false);
}
