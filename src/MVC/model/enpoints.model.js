const fs = require("fs/promises")

exports.selectApi = () => {
    return fs.readFile(`${__dirname}/../../endpoints.json`, 'utf-8').then((data)=> {
        const endpoints = JSON.parse(data);
        return endpoints
        })    
    }