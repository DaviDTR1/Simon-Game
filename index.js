var lvl = 1;
var start = false
var over = false
var cont = 0; 
var list_game = [];

function add_sound(){
    var bt_color = this.classList[1];
    this.classList.toggle('pressed');
    console.log(list_game[cont]+" "+cont+" "+bt_color);
    if(list_game[cont] === bt_color){
        cont++;
        var audio = new Audio("/sounds/"+bt_color+".mp3");
        audio.play();
    } else {
        var audio = new Audio("/sounds/wrong.mp3");
        audio.play();
        over=true;
        $('#level-title').text("GAME OVER, Press Any Key For Restart");
    }
    setTimeout(()=>{$('.'+bt_color).toggleClass('pressed');},100);
    if(cont==lvl){
        lvl++;
        setTimeout(()=>{jugar(lvl);},150);
    }
}

function play_sound(bt_color){
    console.log(bt_color);
    list_game.push(bt_color); 
    var audio =new Audio("/sounds/"+bt_color+".mp3");
    audio.play();
    $('.'+bt_color).toggleClass('pressed');
    return new Promise((res)=>{
        setTimeout(()=>{$('.'+bt_color).toggleClass('pressed');},150);
        setTimeout(() => {
            res('resolved');
        },250);
    });
}

async function jugar(lvl){
    var list = ['green','red','yellow','blue'];
    cont = 0;
    $('#level-title').text("Level "+lvl);
    list_game = [];
    for(var i=0; i< lvl;i++){
        var s = Math.floor(Math.random()*4);
        const result = await play_sound(list[s]);
        console.log(result);
    }
}

$( ".btn" ).on("click", add_sound);
$(document).keypress(()=>{
    if(start === false){
        start = true;
        over = false;
        setTimeout(()=>{jugar(lvl);},150);
    }
    if(over === true){
        lvl = 1;
        start = true;
        over = false;
        setTimeout(()=>{jugar(lvl);},150);
    }
});




