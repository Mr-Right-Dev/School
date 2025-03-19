function toggle(id) {
    let item = document.getElementById(id);
    if (item == undefined) {
        return;
    } 

    let state = item.getAttribute("state");
    state = (state == 'true');

    item.querySelector("#arrow").style.rotate = state ? '0deg' : '90deg';
    item.querySelector("#content").style.display = state ? 'none' : 'block';
    item.setAttribute("state", !state);
}