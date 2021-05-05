export function renderInput (id, status) {
    const error = document.getElementById(`${id}Error`);
    const input = document.getElementById(id);

    if (!status.result) {
        input.style.borderColor = '#ff0000';
        if (error) {
            error.textContent = `${input.dataset.name}: ${status.text}`;
        }
        return status.result;
    }

    input.style.borderColor = '#808080';
    if (error) {
        error.innerHTML = input.dataset.name;
    }
    return status.result;
}
