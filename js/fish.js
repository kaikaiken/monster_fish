//鱼边界为 (25,50) (25,585) (1385,50) (1385,585)

//添加鱼
function addFish() {
    $("#fish_buffer").append('<img class="fish_sample" id="Game_Guppy_' + fish_total_num +'" src="./img/fish/smallGuppy/smallGuppy_110.jpg">')

    let random_number = Math.round(Math.random()*955);
    let img = document.getElementById("Game_Guppy_"+fish_total_num);
    img.style.left = (245 + random_number).toString() +"px";
    img.style.top = 0+ "px";
    fishes.push(
        {   Guppy_ID: "Game_Guppy_" + fish_total_num,
            Guppy_type: 1,
            Guppy_health: 10,
            Guppy_state: 1,
            Guppy_direct: 0,
            Guppy_move: 0,
            Guppy_to_y: img.style.left.toString(),
            Guppy_to_x: "132px",
            Guppy_hunger: 70,
            Guppy_growth: 0,
            Guppy_hunger_rate: 9,
            Guppy_target_food: -1}
    );
    dropFish(fish_total_num);
    let imgS = document.getElementsByClassName("food_sample");
    //管理饥饿度
    let time_stop = setInterval ( function ( ) {
        let fish_id = getIDFish(img.id);
        if(fishes[fish_id].Guppy_state < 3){
            fishes[fish_id].Guppy_hunger = fishes[fish_id].Guppy_hunger - fishes[fish_id].Guppy_hunger_rate;
            if(fishes[fish_id].Guppy_hunger <= 0){
                fishes[fish_id].Guppy_state = 3;
                deadFish(img);
                clearInterval(time_stop);
            }else if(fishes[fish_id].Guppy_hunger <= 45){
                //饥饿状态
                if(fishes[fish_id].Guppy_state !== 2){
                    fishes[fish_id].Guppy_state = 2;
                    img.src = "./img/fish/smallGuppy/smallGuppy_"+ fishes[fish_id].Guppy_type +"20.jpg";
                }

            }
        }
    },  5000 );
    //管理钱
    let create_food = setInterval ( function ( ) {
        let fish_id = getIDFish(img.id);
        if(fishes[fish_id].Guppy_state < 3 && fishes[fish_id].Guppy_type > 1){
            let x = img.style.left.slice(0,-2);
            let y = img.style.top.slice(0,-2);
            let direct = fishes[fish_id].Guppy_direct;
            let type = fishes[fish_id].Guppy_type;
            createCoin(x , y , direct ,type-1)
        }
    },  16500 );
    //随机吃食物
    let eat_food = setInterval ( function ( ) {
        let fish_id = getIDFish(img.id);
        if(fishes[fish_id].Guppy_state === 1 && fishes[fish_id].Guppy_hunger <= 90 && fishes[fish_id].Guppy_hunger > 70){
            let x = img.style.left.slice(0,-2);
            let y = img.style.top.slice(0,-2);
            for( let i=0;i<imgS.length;i++){
                if(imgS.item(i).getAttribute("data-use") === "1"){
                    let food = imgS.item(i);
                    let near_x = food.style.left.slice(0,-2);
                    let near_y = food.style.top.slice(0,-2);
                    if(fishes[fish_id].Guppy_direct === 1){
                        near_x =near_x -40;
                    }
                    let x_D_value = parseInt(near_x,10) - x;
                    let y_D_value = parseInt(near_y,10) - y;
                    if( x_D_value < 10 && y_D_value > -10 && x_D_value > -10 && y_D_value < 10){
                        eatFood(img,fish_id,food);
                    }
                }
            }
        }
    },  200 );
    fish_total_num++;
    fish_current_num++;
}

//鱼被吃掉
function BeEaten(fish_ID) {
    let fish_id = getIDFish(fish_ID);
    if(fishes[fish_id].Guppy_state < 3){
        fishes[fish_id].Guppy_state = 4;
        let fish = document.getElementById(fish_ID);
        let blood = document.getElementById("blood_sample");
        let new_x =  parseInt(fish.style.left.slice(0,-2) , 10) + 15;
        let new_y =  parseInt(fish.style.top.slice(0,-2) , 10) + 15;
        blood.style.left = new_x + "px";
        blood.style.top =  new_y + "px";
        document.getElementById("fish_buffer").removeChild(fish);
        checkGame();
        let time_delete = setInterval ( function ( ) {
            blood.style.display = "none";
            clearInterval(time_delete);
        },  750 );
    }
}


//鱼吃食物和长大
function eatFood(fish , fish_id ,food) {
    let temp = 0;
    fishes[fish_id].Guppy_hunger = fishes[fish_id].Guppy_hunger + 15;
    fishes[fish_id].Guppy_growth = fishes[fish_id].Guppy_growth + food_growth;
    if(fishes[fish_id].Guppy_hunger > 50){
        fishes[fish_id].Guppy_state = 1;
        fishes[fish_id].Guppy_move = 0;
        temp = 1;
    }
    if(fishes[fish_id].Guppy_type === 1&& fishes[fish_id].Guppy_growth>=80){
        fishes[fish_id].Guppy_type = 2;
        temp = 2;
    }
    if(fishes[fish_id].Guppy_type === 2&& fishes[fish_id].Guppy_growth>=300){
        fishes[fish_id].Guppy_type = 3;
        temp = 3;
    }
    if(temp > 0){
        if(fishes[fish_id].Guppy_direct === 0){
            fish.src = "./img/fish/smallGuppy/smallGuppy_"+ fishes[fish_id].Guppy_type + fishes[fish_id].Guppy_state +"0.jpg";
        }else{
            fish.src = "./img/fish/smallGuppy/smallGuppy_"+ fishes[fish_id].Guppy_type + fishes[fish_id].Guppy_state +"9.jpg";
        }
    }
    deleteFood(food);

}

//计算离自己最近的食物
function findFood(fish) {
    let imgS = document.getElementsByClassName("food_sample");
    let x = parseInt(fish.style.left.slice(0,-2),10);

    let y = parseInt(fish.style.top.slice(0,-2),10);
    let fish_id =getIDFish(fish.id);
    if(food_number === 0){
        let random_x = Math.round(Math.random()*1360);
        let random_y = Math.round(Math.random()*535);
        fishes[fish_id].Guppy_to_x = 25 + random_x;
        fishes[fish_id].Guppy_to_y = 50 + random_y;
    }else{
        let near_food = 1000000;
        let near_x = 0;
        let near_y = 0;
        let near_i = -1;
        for( let i=0;i<imgS.length;i++){
            if(imgS.item(i).getAttribute("data-use") === "1"){
                let img = imgS.item(i);
                let x_D_value = parseInt(img.style.left.slice(0,-2),10) - x;
                let y_D_value = parseInt(img.style.top.slice(0,-2),10) - y;
                let pos = Math.sqrt(x_D_value*x_D_value+y_D_value*y_D_value);
                if( pos < near_food ){
                    near_food = pos;
                    near_i = i;
                    near_x = img.style.left.slice(0,-2);
                    near_y = img.style.top.slice(0,-2);
                    if(x_D_value > 0){
                        near_x =near_x - 40;
                    }

                }
            }
        }
        fishes[fish_id].Guppy_target_food = near_i;
        fishes[fish_id].Guppy_to_x = near_x;
        fishes[fish_id].Guppy_to_y = near_y;
    }
}

//鱼搜索食物
function searchFood() {
    let imgS = document.getElementsByClassName("fish_sample");
    for( let i=0;i<imgS.length;i++){
        let img = imgS.item(i);
        let fish_id =getIDFish(img.id);
        if(fishes[fish_id].Guppy_state === 2 || (fishes[fish_id].Guppy_state === 1 && fishes[fish_id].Guppy_hunger <= 70)){
            fishes[fish_id].Guppy_move = 2;
            findFood(img);
        }
    }
}

//鱼饿死死亡动画
function deadFish(img) {
    let i = 1;
    let fish_id = getIDFish(img.id);
    let time_delete = setInterval ( function () {
        if(i < 9){
            img.src = "./img/fish/smallGuppy/smallGuppy_"+  fishes[fish_id].Guppy_type +"3"+ i +".jpg";
            i++;
        }
        if(i === 9){
            fishes[fish_id].Guppy_state = 4;
            i++
        }
        if(i === 10){
            document.getElementById("fish_buffer").removeChild(img);
            checkGame();
            clearInterval(time_delete);
        }
    },  50 );

}

function addTestFish() {
    $("#fish_buffer").append('<img class="fish_sample" id="Game_Guppy_' + fish_total_num +'" src="./img/fish/smallGuppy/smallGuppy_110.jpg">')
    let random_number = Math.round(Math.random()*955);
    let img = document.getElementById("Game_Guppy_"+fish_total_num);
    img.style.left = (1425 - 5*fish_total_num) +"px";
    img.style.top = 585+ "px";
    fishes.push(
        {   Guppy_ID: "Game_Guppy_" + fish_total_num,
            Guppy_type: 1,
            Guppy_health: 10,
            Guppy_state: 1,
            Guppy_direct: 0,
            Guppy_move: 0,
            Guppy_to_y: img.style.left.toString(),
            Guppy_to_x: "132px",
            Guppy_hunger: 100,
            Guppy_growth: 0,
            Guppy_hunger_rate: 10,
            Guppy_target_food: -1}
    );
    // dropFish(fish_total_num);
    fish_total_num++;
    fish_current_num++;
}

//鱼下落动画
function dropFish(number){
    let the_fish = document.getElementById("Game_Guppy_"+number);
    let new_x = parseInt(the_fish.style.top.slice(0,-2),10) + fish_drop_speed;
    the_fish.style.top =  new_x + "px";
    if(new_x < 132){
        requestAnimationFrame(function () {
            dropFish(number);
        });
    }
}

//鱼移动位置
function moveFish() {
    let imgS = document.getElementsByClassName("fish_sample");
    for( let i=0;i<imgS.length;i++){
        let img = imgS.item(i);
        if(getStateFish(img.id) === 1 && getMoveFish(img.id)===0){
            let fish_id =getIDFish(img.id);
            let random_x = Math.round(Math.random()*1360);
            let random_y = Math.round(Math.random()*535);
            fishes[fish_id].Guppy_move = 1;
            fishes[fish_id].Guppy_to_x = 25 + random_x;
            fishes[fish_id].Guppy_to_y = 50 + random_y;
        }
    }
}

//鱼移动
function swimFish() {
    let imgS = document.getElementsByClassName("fish_sample");
    for( let i=0;i<imgS.length;i++){
        let img = imgS.item(i);
        if(getMoveFish(img.id) === 1 || getMoveFish(img.id) === 2){
            let fish_id =getIDFish(img.id);
            let fish_speed = fishes[i].Guppy_state;
            let x = fishes[i].Guppy_to_x-img.style.left.slice(0,-2);
            let y = fishes[i].Guppy_to_y-img.style.top.slice(0,-2);
            let new_x = parseInt(img.style.left.slice(0,-2),10);
            let new_y = parseInt(img.style.top.slice(0,-2),10);
            if(x > 0){
                if( x < fish_speed){
                    new_x = new_x + x;
                }else{
                    new_x = new_x + fish_speed;
                }
            }else if(x < 0){
                if( x > (-1 * fish_speed)){
                    new_x = new_x + x;
                }else{
                    new_x = new_x - fish_speed;
                }
            }
            if(y > 0){
                if( y < fish_speed){
                    new_y = new_y + y;
                }else{
                    new_y = new_y + fish_speed;
                }
            }else if(y < 0){
                if( y > (-1 * fish_speed)){
                    new_y = new_y + y;
                }else{
                    new_y = new_y -fish_speed;
                }
            }
            if(x < 2 && x > -2 && y<=0 && y > -2){
                if(getMoveFish(img.id) === 1){
                    fishes[fish_id].Guppy_move = 0 ;
                }else if(getMoveFish(img.id) === 2 &&  fishes[fish_id].Guppy_target_food > -1){
                    let my_food=document.getElementById("create_food_0" + fishes[fish_id].Guppy_target_food);
                    if(my_food.getAttribute("data-use") === "1"){
                        eatFood(img , fish_id , my_food);
                    }
                }

            }

            if(x > 0 && fishes[fish_id].Guppy_direct ===0){
                fishAnimate(img);
                fishes[fish_id].Guppy_direct = 1 ;
            }else if(x < 0 && fishes[fish_id].Guppy_direct === 1){
                fishAnimate(img);
                fishes[fish_id].Guppy_direct = 0 ;
            }
            img.style.top = new_y + "px";
            img.style.left = new_x + "px";

        }
    }
    requestAnimationFrame(swimFish);
}

//鱼转身动画
function fishAnimate(img){
    let fish_id = getIDFish(img.id);
    let animate = fishes[fish_id].Guppy_direct;
    if(animate === 0){
        for(let i = 1;i < 10 ;i++){
            img.src = "./img/fish/smallGuppy/smallGuppy_"+ fishes[fish_id].Guppy_type + fishes[fish_id].Guppy_state + i +".jpg";
        }
    }else{
        for(let i = 8;i >= 0 ;i--){
            img.src = "./img/fish/smallGuppy/smallGuppy_"+ fishes[fish_id].Guppy_type+ fishes[fish_id].Guppy_state + i +".jpg";
        }
    }
}

function beHunger(id) {
    let fish_id = getIDFish(id);
    if(fishes[fish_id].Guppy_state < 3){
        fishes[fish_id].Guppy_hunger = fishes[fish_id].Guppy_hunger - fishes[fish_id].Guppy_hunger_rate;
        if(fishes[fish_id].Guppy_hunger <= 0){
            clearInterval(this);
        }else if(fishes[fish_id].Guppy_hunger < 50){
            //饥饿状态
        }
    }
}

//获取数组id
function getIDFish(id) {
    for(let i =0;i<fishes.length;i++){
        if(fishes[i].Guppy_ID === id){
            return i;
        }
    }
    return -1;
}
//获取鱼生命
function getHealthFish(id) {
    for(let i =0;i<fishes.length;i++){
        if(fishes[i].Guppy_ID === id){
            return fishes[i].Guppy_health;
        }
    }
    return -1;
}
//获取鱼方向
function getDirectFish(id) {
    for(let i =0;i<fishes.length;i++){
        if(fishes[i].Guppy_ID === id){
            return fishes[i].Guppy_direct;
        }
    }
    return -1;
}
//获取鱼状态
function getStateFish(id) {
    for(let i =0;i<fishes.length;i++){
        if(fishes[i].Guppy_ID === id){
            return fishes[i].Guppy_state;
        }
    }
    return -1;
}
//获取鱼移动状态
function getMoveFish(id) {
    for(let i =0;i<fishes.length;i++){
        if(fishes[i].Guppy_ID === id){
            return fishes[i].Guppy_move;
        }
    }
    return -1;
}

$(document).ready(function(){
    swimFish();
    let getMoveFish = setInterval(moveFish, 4500);
    let getFoodFish = setInterval(searchFood, 1000);
});
