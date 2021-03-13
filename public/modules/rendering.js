export function renderInput (id, status) {
    const error = document.getElementById(`${id}Error`);
    const input = document.getElementById(id);

    if (!status.result) {
        input.style.borderColor = '#ff0000';
        error.textContent = status.text;
        error.style.opacity = '1';
        return status.result;
    }

    input.style.borderColor = '#808080';
    error.innerHTML = input.placeholder;
    error.style.opacity = '1';
    return status.result;
}
