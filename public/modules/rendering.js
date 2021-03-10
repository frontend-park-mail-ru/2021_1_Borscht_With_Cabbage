export function renderInput (id, status) {
    const error = document.getElementById(`${id}Error`);
    const input = document.getElementById(id);

    if (!status.result) {
        input.style.borderColor = '#ff0000';
        error.textContent = status.text;
        error.hidden = false;
        return status.result;
    }

    input.style.borderColor = '#808080';
    error.innerHTML = '';
    error.hidden = true;
    return status.result;
}
