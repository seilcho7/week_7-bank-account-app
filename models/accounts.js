const db = require('./conn');
const bcrypt = require('bcrypt');

class Account {
    constructor(id, first_name, last_name, account_id, password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.accountId = account_id;
        this.password = password;
    };

    static getAll() {
        return db.any('select * from accounts')
            .then((accountData) => {
                console.log(accountData);
                return accountData;
            });
    }

    static getById(id) {
        return db.one(`select * from accounts where id=${id}`)
            .then((accountData) => {
                console.log(accountData);
                return accountData;
            });
    }

    static add(accountData) {
        return db.one(`
            insert into accounts
                (first_name, last_name, account_id, password)
            values
                ($1, $2, $3, $4)
            returning id
        `, [accountData.first_name, accountData.last_name, accountData.account_id, accountData.password])
            .then((data) => {
                return data.id;
            });
    }


}
module.exports = Account;