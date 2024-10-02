const {selectApi} = require('../model/enpoints.model')

exports.getApi = (request, response, next) => {
    selectApi().then((endpoint) => {
        response.status(200).send({endpoint});
    }).catch((err)=>{
        next(err)
    })
  };