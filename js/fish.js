//鱼边界为 (25,50) (25,585) (1385,50) (1385,585)

//添加鱼
function addFish() {
    $("#fish_buffer").append('<img class="fish_sample" id="Game_Guppy_' + fish_total_num +'" src="./img/fish/smallGuppy/smallGuppy_10.jpg">')

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
            Guppy_to_x: "132px"}
    );
    dropFish(fish_total_num);
    fish_total_num++;
    fish_current_num++;
}


function addTestFish() {
    $("#fish_buffer").append('<img class="fish_sample" id="Game_Guppy_' + fish_total_num +'" src="./img/fish/smallGuppy/smallGuppy_10.jpg">')
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
            Guppy_to_x: "132px"}
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
            // let random_y = Math.round(Math.random()*140);
            // let random_x = Math.round(Math.random()*140);
            // let to_y =parseInt(img.style.top.slice(0,-2),10) - 70 + random_y;
            // let to_x =parseInt(img.style.left.slice(0,-2),10) -70 + random_x;
            // //鱼边界为 (25,50) (25,585) (1385,50) (1385,585)
            // if(to_x > 1385){
            //     to_x = 1385;
            // }else if(to_x < 25){
            //     to_x = 25;
            // }
            // if(to_y > 585){
            //     to_y = 585;
            // }else if(to_y < 50){
            //     to_y = 50;
            // }
            // fishes[fish_id].Guppy_move = 1;
            // fishes[fish_id].Guppy_to_x = to_x;
            // fishes[fish_id].Guppy_to_y = to_y;
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
        if(getMoveFish(img.id) === 1){
            let fish_id =getIDFish(img.id);
            let x = fishes[i].Guppy_to_x-img.style.left.slice(0,-2);
            let y = fishes[i].Guppy_to_y-img.style.top.slice(0,-2);
            let new_x = parseInt(img.style.left.slice(0,-2),10);
            let new_y = parseInt(img.style.top.slice(0,-2),10);
            if(x > 0){
                if( x < 2){
                    new_x = new_x + x;
                }else{
                    new_x = new_x + 2;
                }
            }else if(x < 0){
                if( x > -2){
                    new_x = new_x + x;
                }else{
                    new_x = new_x - 2;
                }
            }
            if(y > 0){
                if( y < 2){
                    new_y = new_y + y;
                }else{
                    new_y = new_y + 2;
                }
            }else if(y < 0){
                if( y > -2){
                    new_y = new_y + y;
                }else{
                    new_y = new_y - 2;
                }
            }
            if(x === 0 && y === 0){
                fishes[fish_id].Guppy_move = 0 ;
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
    let animate = getDirectFish(img.id);
    if(animate === 0){
        for(let i = 1;i < 10 ;i++){
            img.src = "./img/fish/smallGuppy/smallGuppy_1"+ i +".jpg";
        }
    }else{
        for(let i = 8;i >= 0 ;i--){
            img.src = "./img/fish/smallGuppy/smallGuppy_1"+ i +".jpg";
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
//获取鱼状态
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
});
