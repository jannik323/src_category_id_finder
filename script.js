
function findgame(self){
    if(!self.value){
        document.getElementById("games").innerHTML = "";

        return;
    }

    let s = document.createElement("script");
    s.id = "deleteme"
    s.src = `https://speedrun.com/api/v1/games?bulk=yes&max=100&name=${encodeURIComponent(self.value)}&callback=listgames`;
    document.body.appendChild(s);
}

function listgames(data){
    document.body.removeChild(document.getElementById("deleteme"));
    let list = document.getElementById("games");
    list.innerHTML = "";

    data.data.forEach(game => {
        let op = document.createElement("option");
        op.value = game.id;
        op.innerHTML = game.names.international;
        list.appendChild(op);
    });
    findcategories(list);

}

function findcategories(self){

    if(!self.value){
        document.getElementById("categories").innerHTML = "";
        return;
    }

    let s = document.createElement("script");
    s.id = "deleteme2"
    s.src = `https://speedrun.com/api/v1/games/${encodeURIComponent(self.value)}/categories?callback=listcategories`;
    document.body.appendChild(s);
}


function listcategories(data){
    document.body.removeChild(document.getElementById("deleteme2"));
    console.log(data);

    let list = document.getElementById("categories");
    list.innerHTML = "";

    data.data.forEach(cate => {
        let div = document.createElement("div");
        div.innerHTML = cate.name+" "+cate.type+" id: "+ cate.id;
        
        list.appendChild(div);
    });
}
