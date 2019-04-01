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

    static update(id, accountData) {
        return db.result(`
            update accounts
            set first_name = $1, last_name = $2, account_id = $3, password = $4
            where id=$5
        `, [accountData.first_name, accountData.last_name, accountData.account_id, accountData.password, id])
    }

    static delete(id) {
        return db.result(`
            delete from accounts where id=${id}
        `);
    }

}
module.exports = Account;