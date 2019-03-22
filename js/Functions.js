function GoToPage(ref) {
    localStorage.ln = arrUsers.length;
    localStorage.cur = cur;
    var parsed = JSON.stringify(arrUsers);
    localStorage.setItem("Users", parsed);
    document.location.href = ref;
}

function LoadArr() {
    if (localStorage.ln > 0)
    {
        arrUsers = JSON.parse(localStorage.getItem('Users'));
    }
    cur = localStorage.cur;
}

function CheckPas(name, pas1, pas2, em) {
    if (name !== "" && em !== "" && pas1 !== "" && pas2 !== "") {
        if (pas1 === pas2) {
            AddUser(name, pas1, em);
            AddMoneyStorage('cash', 'cash', '00000000000000', 0);
            localStorage.t = 1;
        }
        else {
            alert("Пароли не совпадают");
            localStorage.t = 0;
        }
    }
    else
    {
        alert("Заполните все поля ввода!");
        localStorage.t = 0;
    }
}

function CheckIn(name, pas) {
    var t = arrUsers.length;
    if (name !== "" && pas !== "") {
        for (var i = 0; i < arrUsers.length; ++i)
        {
            if (arrUsers[i].password === pas && (arrUsers[i].userName === name || arrUsers[i].userEmail === name))
            {
                t = i;
                break;
            }
        }
    }
    if (t === arrUsers.length)
    {
        alert("Несуществует такого пользователя!");
        localStorage.t = 0;
    }
    else
    {
        localStorage.cur = t;
        cur = t;
        localStorage.t = 1;
    }
}

function AddUser(name, pas, em) {
    var user = new UsersSpace(name, pas, em);
    arrUsers.push(user);
    cur = arrUsers.length - 1;
}

function AddMoneyStorage(name, type, number, cash) {
    var money = new MStor(name, type, number);
    money.setUrl();
    money.addCash(cash);
    arrUsers[cur].addMoneySt(money);
}

function ChangeMoneyStorage(name, type, number, cash) {
    var money = arrUsers[cur].moneyStorage[localStorage.curStorage];
    money.name = name;
    money.type = type;
    money.number = number;
    money.cash = cash;
}

function DeleteMoneyStorage(id) {
    arrUsers[cur].moneyStorage.splice(id, 1);
}

function AddTempl(from, to, cash) {
    var tem = new Temp(from, to, cash);
    arrUsers[cur].addTemp(tem);
}

function DeleteTemp(id) {
    arrUsers[cur].tempsArr.splice(id, 1);
}

function ChangeTemp(from, to, cash) {
    var temp = arrUsers[cur].tempsArr[localStorage.curTemp];
    temp.from = from;
    temp.to = to;
    temp.cash = cash;
}

function DeleteTrans(id) {
    arrUsers[cur].trans.splice(id, 1);
}

function WriteStat(txt) {
    var money = arrUsers[cur].moneyStorage;
    var addText = "";
    for (var i = 0; i < arrUsers[cur].trans.length; ++i)
    {
        var tran = arrUsers[cur].trans[i];
        addText += '         <div class="row">' +
                   '            <div class="col">' + '<img src="'+money[tran.from].url + '" alt = "">' +
                   '                <h5>' + money[tran.from].name + ' ' + money[tran.from].number +
                   '                </h5>' +
                   '            </div>' +
                   '         </div>';
    }
    txt.push(addText);
}


function SaveId(id) {

    document.location.curStor = id;
}


function SaveTemp(id) {

    document.location.curTemp = id;
}

function WriteAllStorages(txt) {
    var money = arrUsers[cur].moneyStorage;
    var addText = "";
    for (var i = 0; i < money.length; ++i)
    {
        addText += '         <div class="row" style="border-style: double">' +
            '            <div class="col" style="text-align: center; background-color: white">' + '<img src="'+money[i].url + '" alt ="" height=150px>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '                <p style="align-items: center"> Имя: ' + money[i].name + '<br> Номер: ' + money[i].number + '<br> Денег на счету: ' + String(money[i].cash) +
            '                </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '                    <button type="submit" class="btn btn-primary btn-block" onclick="SaveId(String('+i+'))">  Изменить  </button>' +
            '            </div>' +
            '         </div>';
    }
    txt.push(addText);
}

function Template(txt) {
    var temps = arrUsers[cur].tempsArr[localStorage.curTemp];
    var addText = "";
    addText += '         <div class="row">' +
        '            <div class="col" style="text-align: center">' +
        '               <p style="align-items: center"> Откуда </p>' +
        '            </div>' +
        '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
        '               <p style="align-items: center"> Куда </p>' +
        '            </div>' +
        '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
        '               <p style="align-items: center"> Сколько </p>' +
        '            </div>' +
        '         </div>';
    if (localStorage.curStorage > -1) {
        addText += '         <div class="row">' +
            '            <div class="col" style="text-align: center">' +
            '               <input name="from" class="form-control" value="'+ temps.name + '" type="" required>' +
            '            </div>'+
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="to" class="form-control" value="'+ temps.number + '" type="" required>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="cash" class="form-control" value="'+ temps.type + '" type="" required>' +
            '            </div>' +
            '         </div>';
    }
    else
    {
        addText += '         <div class="row">' +
            '            <div class="col" style="text-align: center">' +
            '               <input name="from" class="form-control" value="" type="" required>' +
            '            </div>'+
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="to" class="form-control" value="" type="" required>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="cash" class="form-control" value="" type="" required>' +
            '            </div>' +
            '         </div>';
    }
    txt.push(addText);
}

function Storage(txt) {
    var temps = arrUsers[cur].moneyStorage[localStorage.curStorage];
    var addText = "";
    addText += '         <div class="row">' +
            '            <div class="col" style="text-align: center">' +
            '               <p style="align-items: center"> Имя </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <p style="align-items: center"> Номер </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <p style="align-items: center"> Тип </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <p style="align-items: center"> На счету </p>' +
            '            </div>' +
            '         </div>';
    if (localStorage.curStorage > -1) {
        addText += '         <div class="row">' +
            '            <div class="col" style="text-align: center">' +
            '               <input name="name" class="form-control" value="'+ temps.name + '" type="" required>' +
            '            </div>'+
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="number" class="form-control" value="'+ temps.number + '" type="" required>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="type" class="form-control" value="'+ temps.type + '" type="" required>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="cash" class="form-control" value="'+ String(temps.cash) + '" type="" required>' +
            '            </div>' +
            '         </div>';
    }
    else
    {
        addText += '         <div class="row">' +
            '            <div class="col" style="text-align: center">' +
            '               <input name="name" class="form-control" value="" type="" required>' +
            '            </div>'+
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="number" class="form-control" value="" type="" required>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="type" class="form-control" value="" type="" required>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <input name="cash" class="form-control" value="" type="" required>' +
            '            </div>' +
            '         </div>';
    }
    txt.push(addText);
}


function WriteAllTemp(txt) {
    var temps = arrUsers[cur].tempsArr;
    var addText = "";
    for (var i = 0; i < temps.length; ++i)
    {
        addText += '         <div class="row" style="border-style: double">' +
            '            <div class="col" style="text-align: center; background-color: white">' +
            '               <p style="align-items: center"> Откуда: ' + arrUsers[cur].moneyStorage[temps[i].from].name +
            ' ' + arrUsers[cur].moneyStorage[temps[i].from].number + ' </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <p style="align-items: center"> Куда: ' + temps[i].to + ' </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '               <p style="align-items: center"> Цена: ' + temps[i].cash + ' </p>' +
            '            </div>' +
            '            <div class="col" style="align-items: center; justify-content: center; display: flex">' +
            '                    <button type="submit" class="btn btn-primary btn-block" onclick="DeleteTemp('+ i +')">  Изменить  </button>' +
            '            </div>' +
            '         </div>';
    }
    txt.push(addText);
}

