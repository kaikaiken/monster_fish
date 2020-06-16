function  createCoin(x , y , direct ,type) {
    $("#money_buffer").append('<img class="money_sample" id="Coin_' + coin_total_num
        +'" src="./img/money/coin_'+ type +'0.jpg" onclick="collectCoin(this)" data-current="0" data-state="0" data-type="'+ type +'">')
    let img = document.getElementById("Coin_"+coin_total_num);
    if(direct === 0){
        let img_x = parseInt(x,10) + 40;
        if(parseInt(x,10) > 1350){
            img_x = 1390;
        }
        img.style.left =img_x +"px";
        img.style.top = y+ "px";
    }else{
        img.style.left = x +"px";
        img.style.top = y + "px";
    }

    coin_total_num++

}

function coinMove() {
    for(let i = 0 ; i < food_level ; i ++){
        let imgS = document.getElementsByClassName("money_sample");
        for(let i = 0 ; i < imgS.length;i++){
            let img = imgS.item(i);
            coinAnimate(img);
            if(img.getAttribute("data-state") === "0"){
                let new_y = parseInt(img.style.top.slice(0,-2),10) + coin_drop_speed;
                if(new_y >= 618){
                    img.setAttribute("data-state" , "1");
                    let stay_ground = setInterval ( function ( ) {
                        deleteCoin(img);
                        clearInterval(stay_ground);
                    },  4500 );
                }else{
                    img.style.top = new_y + "px";
                }
            }
        }
    }
    if(game_start_flag === 1){
        requestAnimationFrame(coinMove);
    }
}
//删除硬币
function deleteCoin(img) {
    if(img !== null){
        if(game_start_flag === 1){
            document.getElementById("money_buffer").removeChild(img);
        }
    }
}

//硬币下落动画
function coinAnimate(img){
    let animate = img.getAttribute("data-current");
    let type = img.getAttribute("data-type");
    if(animate === "9"){
        img.src = "./img/money/coin_"+ type + 1 +".jpg";
        img.setAttribute("data-current" , "1");
    }else{
        animate++;
        img.src = "./img/money/coin_"+ type + animate +".jpg";
        img.setAttribute("data-current" , animate);
    }
}

function collectCoin(coin){
    let type = coin.getAttribute("data-type");
    if(type === 1){
        addMoney(silver_coin_cost);
    }else{
        addMoney(gold_coin_cost);
    }
    coin.style.display = "none";
}
function coin_game(){
    coinMove();
}
