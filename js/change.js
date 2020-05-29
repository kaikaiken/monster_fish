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
                alert("游戏胜利")
            }

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

