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

//点击攻击
$(document).ready(function(){
    $("#create_monster_10 , #create_monster_20").click(function(e){
        let id = $(this).attr("id");
        let monster = document.getElementById(id);
        attack(monster);
        let new_x = 0;
        let new_y = 0;
        let temp_x = parseInt(monster.style.left.slice(0,-2),10);
        let temp_y = parseInt(monster.style.top.slice(0,-2),10);
        let x_D_value = temp_x + 80 - e.pageX;

        let y_D_value = temp_y + 80  - e.pageY;

        let type = monster.getAttribute("data-type");
        new_x = x_D_value * monsters[type-1].Monster_fight_back;
        new_y = y_D_value * monsters[type-1].Monster_fight_back;

        //怪物边界 25  1290 525  70
        if(temp_x + new_x > 1290){
            monster.style.left = 1290 + "px";
        }else if(temp_x + new_x < 25){
            monster.style.left = 25 + "px";
        }else{
            monster.style.left = (temp_x + new_x).toString() + "px";
        }
        if(temp_y + new_y > 525){
            monster.style.top = 525 + "px";
        }else if(temp_y + new_y < 70){
            monster.style.top = 70 + "px";
        }else{
            monster.style.top = (temp_y + new_y).toString() + "px";
        }

    })
});

$(function(){
    $(document).keypress(function (e) {
        if (e.keyCode === 65){
            addMoney(1000);
        }
            })
});
function attack(mon) {
    let health = mon.getAttribute("data-health");
    let attack = parseInt(health,10) - player_attack;
    if(attack <= 0){
        deadMonster(mon);
        addMoney(100);
    }else{
        mon.setAttribute("data-health", attack);
    }
}
//检查游戏是否结束
function checkGame() {
    if(document.getElementsByClassName("fish_sample").length === 0){
        document.getElementById("lose_window1").style.display = "";
        game_over();
    }
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
