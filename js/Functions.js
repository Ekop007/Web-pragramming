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
            alert(arrUsers[cur].userName);
        } else {
            alert("Пароли не совпадают");
        }
    }
    alert("Заполните все поля ввода!");
}

function CheckIn(name, pas) {
    var t = arrUsers.length;
    if (name !== "" && pas !== "") {
        for (var i = 0; i < arrUsers.length; ++i)
        {
            if (arrUsers[i].password === pas &&arrUsers[i].userName === name)
            {
                t = i;
                break;
            }
        }
    }
    if (t === arrUsers.length)
    {
        alert("Несуществует такого пользователя!");
    }
    else
    {
        cur = t;
        alert(""+t.toString(cur));
    }
    GoToPage("Score.html")
}

function AddUser(name, pas, em) {
    var user = new UsersSpace(name, pas, em);
    arrUsers.push(user);
    cur = arrUsers.length - 1;
}

function AddMoneyStorage(name, type, number) {
    var money = new MStor(name, type, number);
    money.setUrl();
    arrUsers[cur].addMoneySt(money);
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

function AddTrans(from, to, cash) {
    var trans = new Trans(from, to, cash);
    arrUsers[cur].addTrans(trans);
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