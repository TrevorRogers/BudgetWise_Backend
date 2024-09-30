const format = require('pg-format');
const db = require("../connection");


const seed = ({categoriesData, goalsData, ledgerData, recurring_transactionsData, usersData}) => {
    return db
        .query('DROP TABLE IF EXISTS goals')
        .then(() => {
            return db.query('DROP TABLE IF EXISTS ledger')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS recurring_transactions')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS categories')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS users')
        })
        .then(() => {
            return db.query(`
                CREATE TABLE users (
                user_id SERIAL PRIMARY KEY NOT NULL,
                username VARCHAR NOT NULL,
                password VARCHAR NOT NULL
                );`);
        })
        .then(() => {
            return db.query(`
                CREATE TABLE categories (
                category_id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR NOT NULL,
                description TEXT
                );`);
        }) .then(() => {
            return db.query(`
                CREATE TABLE recurring_transactions (
                transaction_id SERIAL PRIMARY KEY NOT NULL,
                user_id INT NOT NULL REFERENCES users(user_id),
                date_due DATE,
                name VARCHAR NOT NULL,
                amount NUMERIC(10,2) NOT NULL,
                category_id INT NOT NULL REFERENCES categories(category_id),
                essential BOOLEAN,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                is_credit BOOLEAN DEFAULT FALSE
                );`);
        })
        .then(() => {
            return db.query(`
                CREATE TABLE ledger (
                ledger_id SERIAL PRIMARY KEY NOT NULL,
                user_id INT NOT NULL REFERENCES users(user_id),
                created_at TIMESTAMP DEFAULT NOW(),
                name VARCHAR NOT NULL,
                amount NUMERIC(10,2) NOT NULL,
                category_id INT NOT NULL REFERENCES categories(category_id),
                essential BOOLEAN,
                is_credit BOOLEAN DEFAULT FALSE,
                transaction_id INT REFERENCES recurring_transactions(transaction_id)
                );`);
        })
        .then(() => {
            return db.query(`
                CREATE TABLE goals (
                goal_id SERIAL PRIMARY KEY NOT NULL,
                user_id INT NOT NULL REFERENCES users(user_id),
                name VARCHAR NOT NULL,
                target_amount NUMERIC(10,2) DEFAULT 0,
                date_due DATE,
                amount_saved NUMERIC(10,2) DEFAULT 0
                );`);
                //is_active BOOLEAN NOT NULL DEFAULT true
        })
        .then(()=>{
            const insertUsersQueryStr = format(
                `INSERT INTO users (username, password) VALUES %L`,
                usersData.map(({username, password})=> {
                    return [username, password]
                })
            );
            const usersPromise = db.query(insertUsersQueryStr);

            const insertCategoriesQueryStr = format(
                'INSERT INTO categories (name) VALUES %L',
                categoriesData.map(({ name }) => {
                    return [name]
                })
            );
            const categoriesPromise = db.query(insertCategoriesQueryStr);

            return Promise.all([usersPromise, categoriesPromise])
        })
        .then(()=>{
            const insertRecurring_transactionsQueryStr = format(
                `INSERT INTO recurring_transactions (user_id, name, amount, category_id, essential, is_credit) VALUES %L`,
                recurring_transactionsData.map(({ user_id, name, amount, category_id, essential, is_credit})=> {
                    return [user_id, name, amount, category_id, essential, is_credit]
                })
            );
            return db.query(insertRecurring_transactionsQueryStr)
        })
        .then(()=>{
            const insertLedgerQueryStr = format(
                `INSERT INTO ledger (created_at, user_id, name, amount, category_id, essential, transaction_id, is_credit) VALUES %L`,
                ledgerData.map(({created_at, user_id, name, amount, category_id, essential, transaction_id, is_credit})=> {
                    return [created_at, user_id, name, amount, category_id, essential, transaction_id, is_credit]
                })
            );
            return db.query(insertLedgerQueryStr)
        })
        .then(()=>{
            const insertGoalsQueryStr = format(
                `INSERT INTO goals (user_id, name, target_amount, amount_saved) VALUES %L`,
                goalsData.map(({user_id, name, target_amount, amount_saved})=> {
                    return [user_id, name, target_amount, amount_saved]
                })
            );
            return db.query(insertGoalsQueryStr)
        })
}

module.exports = seed;
