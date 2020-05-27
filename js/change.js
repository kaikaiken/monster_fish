function change_mouse_down(btn) {
    btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "3.jpg)"
}

function change_mouse_up(btn) {
    btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "1.jpg)"
}

function change_mouse_out(btn) {
    change_mouse_up(btn);
}