var server_name = 'patient-api'

var port = '8000'

var host = '127.0.0.1'

var restify = require('restify'),

patientSave = require('save')('patients'),

server = restify.createServer({name:'patient-api'})

server.listen(port,host,function(){
    console.log('Server %s listening at %s',server.name,server.url)
    console.log('Resources:')
    console.log('/patients')
    console.log('/patients/:id')
})