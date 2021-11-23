let g_categorytype = "per-game"; 

function findgame(self){
    if(!self.value){
        document.getElementById("games").style.display="none";
        document.getElementById("categories").style.display="none";
        document.getElementById("displayid").style.display="none";
        document.getElementById("displaylevevlid").style.display="none";

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
    list.style.display="block";
    list.innerHTML = "";

    data.data.forEach(game => {
        let op = document.createElement("option");
        op.value = game.id;
        op.innerHTML = game.names.international;
        op.addEventListener("mousedown",()=>{document.body.style.backgroundImage="url("+(game.assets.background.uri)+")"});       
        list.appendChild(op);
    });
    document.body.style.backgroundImage="url("+(data.data[0].assets.background.uri)+")";
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
    let list = document.getElementById("categories");
    list.style.display="block";
    list.innerHTML = "";

    data.data.forEach(cate => {
        let op = document.createElement("option");
        op.innerHTML = cate.name+" "+cate.type;
        op.value = cate.id; 
        op.addEventListener("mousedown",()=>{g_categorytype = cate.type});       
        list.appendChild(op);
    });
    g_categorytype = data.data[0].type;
    findid(list);
}


function findid(self){

    document.getElementById("levels").style.display ="none"; 
    document.getElementById("displaylevelid").style.display ="none"; 

    if(g_categorytype == "per-level"){

        let gameid = document.getElementById("games").value;

        let s = document.createElement("script");
        s.id = "deleteme3"
        s.src = `https://speedrun.com/api/v1/games/${encodeURIComponent(gameid)}/levels?callback=listlevels`;
        document.body.appendChild(s);

    }
    displayid(self);

}

function listlevels(data){
    document.body.removeChild(document.getElementById("deleteme3"));
    let list = document.getElementById("levels");
    list.style.display="block";
    list.innerHTML = "";

    data.data.forEach(lvl => {
        let op = document.createElement("option");
        op.innerHTML = lvl.name;
        op.value = lvl.id; 
        list.appendChild(op);
    });
    displaylevelid(list);
}

function displayid(self){
    let display = document.getElementById("displayid");
    display.style.display = "block";
    display.value = self.value
}

function displaylevelid(self){
    let display = document.getElementById("displaylevelid");
    display.style.display = "block";
    display.value = self.value
}

