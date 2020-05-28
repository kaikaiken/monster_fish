function change_mouse_down(btn) {
    btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "3.jpg)";
}

function change_mouse_up(btn , type) {
    if(type === 1){
        let FoodLevel = btn.getAttribute("name").slice(-1);
        if( FoodLevel < 5){
            FoodLevel++;
            food_level++;
            let newName = btn.getAttribute("name").slice(0 , -1) + FoodLevel;
            btn.setAttribute("name" , newName);
        }
        btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "1.jpg)";
    }else if(type === 2){
        let EggLevel = btn.getAttribute("name").slice(-1);
        if( EggLevel < 3){
            EggLevel++;
            let newName = btn.getAttribute("name").slice(0 , -1) + EggLevel;
            btn.setAttribute("name" , newName);
        }
        btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "1.jpg)";
    }else{
        addFish();
        // addTestFish();
        btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "1.jpg)";
    }

}

function change_mouse_out(btn) {
    btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "1.jpg)";
}