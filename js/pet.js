//创建宠物
function createPet(type) {
    if(type === 1){
        document.getElementById("create_pet_10").style.display="";
        createPearlTime();
    }else if(type === 2){
        let pet =document.getElementById("create_pet_20");
        let random_x = Math.round(Math.random()*1300);
        let random_y = Math.round(Math.random()*500);
        pet.style.left = (30 + random_x).toString() +"px";
        pet.style.top = (55 + random_y).toString()+ "px";
        pet.style.display="";
        pet.setAttribute("data-move" , "0");
        let create_food = setInterval ( function ( ) {
            if(game_start_flag === 0){
                clearInterval(create_food);
            }else{
                let x = pet.style.left.slice(0,-2);
                let y = pet.style.top.slice(0,-2);
                let direct = pet.getAttribute("data-direct");
                createCoin(x , y , direct ,1);
            }
        },  33500 );
    }
}
//骷髅鱼移动
function moveSkeleton() {
    let pet =document.getElementById("create_pet_20");
    if( pet.getAttribute("data-move") === "0") {
        let random_x = Math.round(Math.random() * 1300);
        let random_y = Math.round(Math.random() * 500);
        let new_x = 30 + random_x;
        let new_y = 55 + random_y;
        pet.setAttribute("data-move" , "1");
        pet.setAttribute("data-to-x" , new_x.toString());
        pet.setAttribute("data-to-y" , new_y.toString());
    }
}

//骷髅鱼移动
function swimSkeleton() {
    let pet =document.getElementById("create_pet_20");
    if(pet.getAttribute("data-move") === "1"){
        let fish_speed = 2;
        let x = parseInt(pet.getAttribute("data-to-x"),10)-pet.style.left.slice(0,-2);
        let y = parseInt(pet.getAttribute("data-to-y"),10)-pet.style.top.slice(0,-2);
        let new_x = parseInt(pet.style.left.slice(0,-2),10);
        let new_y = parseInt(pet.style.top.slice(0,-2),10);
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
        if(x === 0&& y === 0){
            pet.setAttribute("data-move","0");
        }
        if(x > 0 && pet.getAttribute("data-direct") === "0"){
            skeletonAnimate(pet);
            pet.setAttribute("data-direct" , "1");
        }else if(x < 0 && pet.getAttribute("data-direct") === "1"){
            skeletonAnimate(pet);
            pet.setAttribute("data-direct" , "0");
        }
        pet.style.top = new_y + "px";
        pet.style.left = new_x + "px";
        }
    if(game_start_flag === 1){
        requestAnimationFrame(swimSkeleton);
    }
}

//骷髅鱼转身动画
function skeletonAnimate(img){
    let animate = img.getAttribute("data-direct");
    if(animate === "0"){
        for(let i = 1;i < 10 ;i++){
            img.src = "./img/pets/pet_"+ img.getAttribute("data-type") + i +".jpg";
        }
    }else{
        for(let i = 8;i >= 0 ;i--){
            img.src = "./img/pets/pet_"+ img.getAttribute("data-type") + i +".jpg";
        }
    }
}

//蛤蜊产生珍珠
function createPearl() {
    let pet = document.getElementById("create_pet_10");
    let open = 1;
    let create_pearl = setInterval ( function ( ) {
        if(game_start_flag === 0){
            clearInterval(create_pearl);
        }else{
            if(open < 9){
                pet.src = "./img/pets/pet_1"+ open +".jpg";
                open++;
            }else if(open === 9){
                pet.src = "./img/pets/pet_1"+ open +".jpg";
                pet.style.cursor = "pointer";
                pet.onclick = function(){collectPearl();};
                clearInterval(create_pearl);
            }
        }
    },  150);

}

//蛤蜊点击后获取珍珠,同时关闭蛤蜊
function collectPearl() {
    addMoney(pearl_cost);
    closePearl()
}

//关闭蛤蜊
function closePearl() {
    let pet = document.getElementById("create_pet_10");
    let close = 10;
    let close_pearl = setInterval ( function ( ) {
        if(game_start_flag === 0){
            clearInterval(close_pearl);
        }else{
            if(close < 17){
                pet.src = "./img/pets/pet_1"+ close +".jpg";
                close++;
            }else if(close === 17){
                pet.src = "./img/pets/pet_1"+ 0 +".jpg";
                pet.style.cursor = "default";
                pet.removeAttribute("onclick");
                createPearlTime()
                clearInterval(close_pearl);
            }
        }
    },  200 );
}

//蛤蜊产生珍珠计时
function createPearlTime() {
    let create_pet = setInterval ( function ( ) {
        if(game_start_flag === 0){
            clearInterval(create_pet);
        }else{
            //产生珍珠
            createPearl();
            clearInterval(create_pet);
        }
    },  62500);

}

//骷髅鱼初始化
//鱼游戏初始化
function skeleton_game(){
    let getMoveSkeleton;
    if(game_start_flag === 1){
        swimSkeleton();
        getMoveSkeleton = setInterval(moveSkeleton, 4500);
    }else{
        clearInterval(getMoveSkeleton);
    }
}


