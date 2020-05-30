function change_mouse_down(btn) {
    if(!btn.disable){
        btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "3.jpg)";
    }
}

function change_mouse_up(btn , type) {
    if(!btn.disable){
        if(type === 1){
            let FoodLevel = btn.getAttribute("name").slice(-1);
            if( FoodLevel < 5){
                FoodLevel++;
                food_level++;
                let newName = btn.getAttribute("name").slice(0 , -1) + FoodLevel;
                btn.setAttribute("name" , newName);
                costMoney(update_Food_cost);
            }
        }else if(type === 2){
            let EggLevel = btn.getAttribute("name").slice(-1);
            if( EggLevel < 3){
                EggLevel++;
                let newName = btn.getAttribute("name").slice(0 , -1) + EggLevel;
                btn.setAttribute("name" , newName);
                costMoney(buy_Egg_cost);
            }
            if(EggLevel === "3" ){
                document.getElementById("win_window1").style.display = "";
                game_over();
            }

        }else if(type === 3){
            document.getElementById("simple_game").style.display = "";
            document.getElementById("menu_background").style.display = "none";
            document.getElementById('my_canvas').style.display = "";
            game_init();
        }else{
            addFish();
            costMoney(buy_Guppy_cost);
            // addTestFish();
        }
    }


}

function change_mouse_out(btn) {
    if(!btn.disable){
        btn.style.backgroundImage="url("+ "./img/buttons/" + btn.getAttribute("name") + "1.jpg)";
    }
}

function back_to_menu() {
    game_over();
}

function window_confirm_down(btn) {
    document.getElementById(btn.id+"s").src = "./img/window/win_window_"+2+".png";
}
function window_confirm_up(btn) {
    document.getElementById(btn.id+"1").style.display = "none";
    document.getElementById("simple_game").style.display = "none";
    document.getElementById("menu_background").style.display = "";
    document.getElementById('my_canvas').style.display = "none";
}


