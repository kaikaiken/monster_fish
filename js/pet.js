//创建宠物
function createPet(type) {
    if(type === 1){
        document.getElementById("create_pet_10").style.display="";
        createPearlTime();
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
    },  500);

}

//蛤蜊点击后获取珍珠,同时关闭蛤蜊
function collectPearl() {
    addMoney(pearl_cost);
}

//关闭蛤蜊
function closePearl(pet) {
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
                clearInterval(close_pearl);
            }
        }
    },  500 );
}

//蛤蜊产生珍珠计时
function createPearlTime() {
    let create_pet = setInterval ( function ( ) {
        if(game_start_flag === 0){
            clearInterval(create_pet);
        }else{
            //产生珍珠
            clearInterval(create_pet);
        }
    },  60000 );

}
