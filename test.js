const { profileEnd } = require('console');
const helper = require('./helper')


const properties = {"cost":"4"};

helper.deleteRelsByType("TEST").then(function(result) {
  console.log(result)
})

