//检查玩家是否够钱
function checkMoney(number){
    return number <= player_money.value;
}

//花费金钱
function costMoney(number) {
    if(checkMoney(number)){
        player_money.value = player_money.value - number;
        checkButton();
    }
}

//增加金钱
function  addMoney(number) {
    player_money.value = parseInt(player_money.value,10) +parseInt(number,10);
    checkButton();
}



//检查其他按钮是否可以按
function checkButton() {
    if(checkMoney(buy_Guppy_cost)){
        game_buy_Guppy_button.disable = false;
        game_buy_Guppy_button.style.backgroundImage="url("+ "./img/buttons/" + game_buy_Guppy_button.getAttribute("name") + "1.jpg)";
    }else{
        game_buy_Guppy_button.disable = true;
        game_buy_Guppy_button.style.backgroundImage="url("+ "./img/buttons/" + game_buy_Guppy_button.getAttribute("name") + "2.jpg)";
    }
    if(checkMoney(update_Food_cost)){
        game_update_Food_button.disable = false;
        game_update_Food_button.style.backgroundImage="url("+ "./img/buttons/" + game_update_Food_button.getAttribute("name") + "1.jpg)";
    }else{
        game_update_Food_button.disable = true;
        game_update_Food_button.style.backgroundImage="url("+ "./img/buttons/" + game_update_Food_button.getAttribute("name") + "2.jpg)";
    }
    if(checkMoney(buy_Egg_cost)){
        game_buy_Egg_button.disable = false;
        game_buy_Egg_button.style.backgroundImage="url("+ "./img/buttons/" + game_buy_Egg_button.getAttribute("name") + "1.jpg)";
    }else{
        game_buy_Egg_button.disable = true;
        game_buy_Egg_button.style.backgroundImage="url("+ "./img/buttons/" + game_buy_Egg_button.getAttribute("name") + "2.jpg)";
    }
}
