function UsersSpace(username, password, email) {
    this.userName = username;
    this.password = password;
    this.userEmail = email;
    this.moneyStorage = [];
    this.tempsArr = [];
    this.trans = [];
    this.addMoneySt = function(stor){
        this.moneyStorage.push(stor);
    };
    this.getMoneySt = function (ind){
        return this.moneyStorage[ind];
    };
    this.addTemp = function(temp){
        this.tempsArr.push(temp);
    };
    this.getTemp = function (ind){
        return this.tempsArr[ind];
    };
    this.addTrans = function(tran){
        this.trans.push(tran);
    };
    this.getTrans = function (ind){
        return this.trans[ind];
    };
}

function MStor(name, type, number, id) {
    this.name = name;
    this.type = type;
    this.cash = 0;
    this.id = id;
    this.number = number;
    this.url = '';
    this.setUrl = function() {
        if (this.type === 'mir') {
            this.url = 'Img/mir-card.jpg';
        } else if (this.type === 'visa') {
            this.url = 'Img/Visa.jpg';
        } else if (this.type === 'mastercad') {
            this.url = 'Img/mastercard.png';
        } else if (this.type === 'storage') {
            this.url = 'Img/PUL.jpg';
        } else {
            this.type = 'cash';
            this.url = 'Img/Cash.jpg';
        }
    };
    this.addCash = function(cash) {
        this.cash += cash;
    }
}

function Temp(from, to, cash) {
    this.from = from;
    this.to = to;
    this.cash = cash;
}

function Trans(from, to, cash) {
    this.from = from;
    this.to = to;
    this.cash = cash;
}
