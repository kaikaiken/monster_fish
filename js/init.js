//*canvas参数
let my_canvas;
let ctx;

//*游戏参数
//游戏开始参数
let game_start_flag;
//游戏类型 1为简单 2为难
let game_mod;


//*小鱼数组参数
//参数有
// 鱼的id
//  Guppy_ID
// 鱼的大小，1为小鱼，2为中鱼，3为大鱼
//  Guppy_type;
// //鱼的血量
//  Guppy_health;
// //鱼的饥饿度（100 掉饥饿度速度分别为10,12,15/5s）
//  Guppy_hunger;
// //鱼掉饥饿度幅度10,12,15/5s
//  Guppy_hunger_rate;
// //鱼的成长值（0 , 80 , 200）
//  Guppy_growth;
// //鱼的状态，1为正常，2为饥饿，3为死亡,4为消失
//  Guppy_state;
// //鱼的方向，0为左，9为右
//  Guppy_direct;
// //鱼是否需要移动,0为等待，1为正在移动，2为准备寻食，3为正在寻食
//  Guppy_move;
// //鱼前往的x方向
//  Guppy_to_x;
// //鱼前往的y方向
//  Guppy_to_y;
// //鱼的食物目标
//  Guppy_target_food
let fishes = [];
//场上有的鱼数量
let fish_current_num;
//添加鱼的数量参数;
let fish_total_num;
//鱼掉落速度
let fish_drop_speed;

//*食物参数
//食物下落速度
const food_speed = 1;
//食物的营养度
let food_growth;
//食物花费
const buy_Food_cost= 5;
// 食物等级
let food_level;
//目前食物数量
let food_number;

//*金钱参数
//银币价值
const silver_coin_cost = 35;
//金币价值
const gold_coin_cost = 80;
//珍珠价值
const pearl_cost = 200;
//硬币总数量
let coin_total_num;
//硬币掉落速度
let coin_drop_speed;
//硬币生产时间
let coin_create_time;

//*游戏花费参数
//玩家金钱
let player_money;
//购买Guppy的花费
const buy_Guppy_cost = 100;
//购买蛋的花费
const buy_Egg_cost = 1000;
//升级饲料
const update_Food_cost = 300;
//玩家攻击数值
const player_attack = 3;

//*按键参数
//买鱼按键
let game_buy_Guppy_button;
//升级食物按键
let game_update_Food_button;
//升级蛋按键
let game_buy_Egg_button;

//*怪物参数
//怪物数组(预估有3种怪物)
//参数有
// //怪物的血量
//  Monster_health;
// //怪物攻击力
//  Monster_attack;
// //怪物速度
//  Monster_speed;
// //怪物攻击速度
//  Monster_attack_speed;
// //怪物抗击退
//  Monster_fight_back;
let monsters = [];
//记录场上怪物数目;
let monster_number;
//怪物事件
let monster_out;


//宠物参数
//怪物出现位置
let monster_x;
let monster_y;
//怪物预言
let monster_pre;

function init() {
    document.getElementById("simple_game").style.display = "none";
    document.getElementById("menu_background").style.display = "";
    document.getElementById('my_canvas').style.display = "none";
    document.getElementById("choose_background").style.display="none";
    document.getElementById("choose_pet").style.display="none";
    game_start_flag = 0;
}

function game_over() {
    //游戏设为没开始
    game_start_flag = 0;
    //画布

    //鱼参数清零
    let last_fish = document.getElementsByClassName("fish_sample");
    let last_fish_number = last_fish.length;
    for(let i = 0 ;i<last_fish_number;i++){
        document.getElementById("fish_buffer").removeChild(last_fish.item(0));
    }
    fish_game();
    fishes.length = 0;
    //怪物参数清零
    let last_monster = document.getElementsByClassName("monster_sample");
    for(let i = 0 ;i<last_monster.length;i++){
        last_monster.item(i).setAttribute("data-use","0");
        last_monster.item(i).style.display = "none";
    }
    clearInterval(monster_out);
    monster_game();
    monsters.length = 0;
    //金币参数清零
    let last_coin = document.getElementsByClassName("money_sample");
    let last_coin_number = last_coin.length;
    for(let i = 0 ;i<last_coin_number;i++){
        document.getElementById("money_buffer").removeChild(last_coin.item(0));
    }
    //食物参数清零
    let last_food = document.getElementsByClassName("food_sample");
    for(let i = 0 ;i<last_food.length;i++){
        last_food.item(i).setAttribute("data-use","0");
        last_food.item(i).style.display = "none";
    }
    //宠物清零
    document.getElementById("create_pet_10").style.display="none";
    document.getElementById("create_pet_20").style.display="none";
    document.getElementById("warning_sample").style.display = "none";
    clearInterval(monster_pre);
    skeleton_game();

}

function game_init(game_type , pet_type) {
    //canvas初始化
    my_canvas = document.getElementById('my_canvas');
    if(!my_canvas.getContext) return;
    ctx = my_canvas.getContext("2d");
    ctx.globalCompositeOperation = "lighten";

    //游戏初始化
    game_start_flag = 1;
    game_mod = game_type;

    //场景初始化
    document.getElementById("game_background").style.backgroundImage = 'url("./img/level/aquarium'+ game_mod +'.png")';

    //小鱼初始化
    fish_current_num = 0;
    fish_total_num = 0;
    fish_drop_speed = 6;
    addFish();
    fish_game();

    // 食物初始化参数
    food_level = 1;
    food_growth = 20;
    food_number = 0;
    food_game();

    //硬币初始化参数
    //硬币总数量
    coin_total_num = 0;
    coin_drop_speed = 1;
    coin_create_time = 18000;
    coin_game();

    //玩家参数初始化
    player_money = document.getElementById("player_money");
    player_money.value = 150;


    //按键初始化
    game_buy_Guppy_button = document.getElementById("game_buy_Guppy_button");
    game_buy_Guppy_button.disable = false;
    game_buy_Guppy_button.style.backgroundImage="url("+ "./img/buttons/" + game_buy_Guppy_button.getAttribute("name") + "1.jpg)";
    game_update_Food_button = document.getElementById("game_update_Food_button");
    game_update_Food_button.disable = true;
    game_update_Food_button.style.backgroundImage="url("+ "./img/buttons/" + game_update_Food_button.getAttribute("name") + "2.jpg)";
    game_buy_Egg_button = document.getElementById("game_buy_Egg_button");
    game_buy_Egg_button.disable = true;
    game_buy_Egg_button.style.backgroundImage="url("+ "./img/buttons/" + game_buy_Egg_button.getAttribute("name") + "2.jpg)";
    document.getElementById("top_warning").style.backgroundColor = "green";

    //怪物初始化
    monsters.push(
        {
            Monster_health: 60,
            Monster_speed:  2,
            Monster_fight_back: 0.8
        },
        {
            Monster_health: 90,
            Monster_speed:  3,
            Monster_fight_back: 1
        },
    )
    monster_number = 0;

    if(game_mod === 1){
        monster_out = setInterval ( function ( ) {
            if(game_start_flag === 0){
                clearInterval(monster_out);
            }else{
                createMonster(1);
            }
        },  60000 );
    }else if(game_mod === 2){
        if(pet_type === 2){
            monster_pre = setInterval ( preMonster,  45000 );
        }else{
            monster_out = setInterval ( function ( ) {
                if(game_start_flag === 0){
                    clearInterval(monster_out);
                }else{
                    createMonster(2 , 0);
                }
            },  55000 );
        }
    }
    monster_game();

    //宠物初始化
    if(game_mod === 2){
        if(pet_type === 1){
            createPet(1);
        }else{
            createPet(2);
            skeleton_game();
        }
    }
}

function preMonster(){
    if(game_start_flag === 0){
        clearInterval(monster_pre);
    }else{
        monster_x = Math.round(Math.random()*1300) + 25;
        monster_y = Math.round(Math.random()*500) + 50;
        document.getElementById("top_warning").style.backgroundColor = "yellow";
        document.getElementById("warning_sample").style.left = monster_x + "px";
        document.getElementById("warning_sample").style.top = monster_y + "px";
        document.getElementById("warning_sample").style.display = "";
        clearInterval(monster_pre);
        monster_out = setInterval ( function ( ) {
            if(game_start_flag === 0){
                clearInterval(monster_out);
            }else{
                document.getElementById("warning_sample").style.display = "none";
                createMonster(2 , 1);
                monster_pre = setInterval ( preMonster,  45000 );
                clearInterval(monster_out);
            }
        },  10000 );
    }
}

$(document).ready(function(){
    init();
});

