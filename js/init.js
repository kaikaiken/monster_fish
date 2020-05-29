//*canvas参数
let my_canvas;
let ctx;

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
const silver_coin_cost = 40;
//金币价值
const gold_coin_cost = 85;
//珍珠价值
const pearl_cost = 250;
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

function init() {
    //canvas初始化
    my_canvas = document.getElementById('my_canvas');
    if(!my_canvas.getContext) return;
    ctx = my_canvas.getContext("2d");
    ctx.globalCompositeOperation = "lighten";

    //小鱼初始化
    fish_current_num = 0;
    fish_total_num = 0;
    fish_drop_speed = 6;
    addFish();

    // 食物初始化参数
    food_level = 1;
    food_growth = 20;
    food_number = 0;

    //硬币初始化参数
    //硬币总数量
    coin_total_num = 0;
    coin_drop_speed = 1;
    coin_create_time = 18000;

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

    //怪物初始化
    monsters.push(
        {
            Monster_health: 60,
            Monster_speed:  2,
            Monster_fight_back: 1
        },
    )
    monster_number = 0;

    let monster_out = setInterval ( function ( ) {
            createMonster(1);
            clearInterval(monster_out);
    },  6000 );
}

function draw(){
    let canvas = document.getElementById('my_canvas');
    if(!canvas.getContext) return;
    let ctx = canvas.getContext("2d");
    //开始代码
    // ctx.beginPath(); //新建一条path
    // ctx.moveTo(50, 50); //把画笔移动到指定的坐标
    // ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
    // //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    // ctx.closePath();
    // ctx.stroke(); //绘制路径。
    let img = document.getElementById("init_pic_01");
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 40, 50, 100.5, 0.5, 40, 50);
        ctx.drawImage(img, 0, 0, 40, 50, 100, 0, 40, 50);
    }
}




$(document).ready(function(){
    init();
});

