function createMonster(type) {
    let monster = document.getElementsByClassName("monster_sample");
    for(let i=0;i < monster.length;i++){
        let mon = monster.item(i);
        if( mon.getAttribute("data-type").toString()=== type.toString() && mon.getAttribute("data-use") === "0" ){
            let random_x = Math.round(Math.random()*1300);
            let random_y = Math.round(Math.random()*500);
            mon.style.display = "";
            mon.setAttribute("data-use","1");
            mon.style.left = (25 + random_x).toString() +"px";
            mon.style.top = (50 + random_y).toString()+ "px";
            break;
        }
    }
}

//计算离自己最近的鱼
function findFish(mon) {
    let imgS = document.getElementsByClassName("fish_sample");
    let x = parseInt(mon.style.left.slice(0,-2),10);
    let y = parseInt(mon.style.top.slice(0,-2),10);

    let near_food = 1000000;
    let near_x = 0;
    let near_y = 0;
    let near_i = -1;
    for( let i=0;i<imgS.length;i++){
        let img = imgS.item(i);
        let fish_id = getIDFish(img.id);
        if(fishes[fish_id].Guppy_state < 3){
            let x_D_value = parseInt(img.style.left.slice(0,-2),10) - x;
            let y_D_value = parseInt(img.style.top.slice(0,-2),10) - y;
            let pos = Math.sqrt(x_D_value*x_D_value+y_D_value*y_D_value);
            if( pos < near_food ){
                near_food = pos;
                near_i = img.id;
                near_x = img.style.left.slice(0,-2);
                near_y = img.style.top.slice(0,-2);
                if(x_D_value > 0){
                    near_x =near_x - 110;
                }
            }
        }
    }
    mon.setAttribute("data-monster_target_food", near_i);
    mon.setAttribute("data-monster_to_x", near_x);
    mon.setAttribute("data-monster_to_y", near_y);
}

//怪物搜索鱼
function searchFish() {
    let imgS = document.getElementsByClassName("monster_sample");
    for( let i=0;i<imgS.length;i++){
        let mon =imgS.item(i);
        if(mon.getAttribute("data-use") === "1"){
            findFish(mon);
        }
    }
}

//怪物吃鱼
function eatFish(mon) {
    mon.setAttribute("data-attack" , "1");
    let fish_id = mon.getAttribute("data-monster_target_food");
    BeEaten(fish_id);
    mon.setAttribute("data-attack" , "0");
}

//怪物移动
function swimMonster() {
    let imgS = document.getElementsByClassName("monster_sample");
    for( let i=0;i<imgS.length;i++){
        let img = imgS.item(i);
        if(img.getAttribute("data-use") === "1"){
            let type = img.getAttribute("data-type");
            let monster_speed = monsters[type-1].Monster_speed;
            let x = img.getAttribute("data-monster_to_x")-img.style.left.slice(0,-2);
            let y =  img.getAttribute("data-monster_to_y")-img.style.top.slice(0,-2);
            let new_x = parseInt(img.style.left.slice(0,-2),10);
            let new_y = parseInt(img.style.top.slice(0,-2),10);
            if(x > 0){
                if( x < monster_speed){
                    new_x = new_x + x;
                }else{
                    new_x = new_x + monster_speed;
                }
            }else if(x < 0){
                if( x > (-1 * monster_speed)){
                    new_x = new_x + x;
                }else{
                    new_x = new_x - monster_speed;
                }
            }
            if(y > 0){
                if( y < monster_speed){
                    new_y = new_y + y;
                }else{
                    new_y = new_y + monster_speed;
                }
            }else if(y < 0){
                if( y > (-1 * monster_speed)){
                    new_y = new_y + y;
                }else{
                    new_y = new_y -monster_speed;
                }
            }
            if(x === 0 && y === 0){
                if(img.getAttribute("data-attack") === "0"){
                    eatFish(img);
                }
            }

            if(x > 0 && img.getAttribute("data-direct") === "0"){
                monsterAnimate(img);
                img.setAttribute("data-direct","1");
            }else if(x < 0 && img.getAttribute("data-direct") === "1"){
                monsterAnimate(img);
                img.setAttribute("data-direct","0");
            }
            img.style.top = new_y + "px";
            img.style.left = new_x + "px";

        }
    }
    requestAnimationFrame(swimMonster);
}

//怪物转身动画
function monsterAnimate(img){
    let animate = img.getAttribute("data-direct");
    if(animate === "0"){
        for(let i = 1;i < 10 ;i++){
            img.src = "./img/monster/monster_"+ img.getAttribute("data-type") + i +".jpg";
        }
    }else{
        for(let i = 8;i >= 0 ;i--){
            img.src = "./img/monster/monster_"+ img.getAttribute("data-type") + i +".jpg";
        }
    }
}



$(document).ready(function(){
    // createMonster(1);
    swimMonster();
    let getFoodMonster = setInterval(searchFish, 500);
});

