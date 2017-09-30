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

server

.use(restify.fullResponse())


.use(restify.bodyParser())

server.get('/patients',function(req,res,next){
    patientSave.find({},function(error, patients){
        res.send(patients)
    })
})


server.get('/patients/:id',function(req,res,next){
    patientSave.findOne({_id:req.params.id},function(error,patient){
        if (error){
            return next(new restify.InvalidArgumentError(JQuery.stringify(errors,errors)))
        }

        if (patient){
            res.send(patient)
        }
        else{
            res.send(404)
        }
    })
})


server.post('/patients',function(req,res,next){
    if(req.params.name===undefined){
        return next(new restify.InvalidArgumentError('name must be supplied'))
    }

    if(req.params.age === undefined){
        return next(new restify.InvalidArgumentError('age must be supplied'))
    }

    if(req.params.wardNumber===undefined){
        return next(new restify.InvalidArgumentError('Ward Number is mandatory'))
    }


    var newPatient = {
        name: req.params.name,
        age:req.params.age,
        wardNumber:req.params.wardNumber
    }

    patientSave.create(newPatient,function(error,patient){
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }

        res.send(201,patient)
    })
})

server.put('/patients/:id',function(req,res,next){
    if(req.params.name===undefined){
        return next(new restify.InvalidArgumentError('name must be supplied'))
    }

    if(req.params.age ===  undefined){
        return next(new restify.InvalidArgumentError('age must be supplied'))
    }

    if(req.params.wardNumber===undefined){
        return next(new restify.InvalidArgumentError('Ward Number is mandatory'))
    }

    var newPatient = {
        _id:req.params.id,
        name:req.params.name,
        age:req.params.age,
        wardNumber:req.params.wardNumber
    }
    
    patientSave.update(newPatient,function(error,patient){

        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send(200)
    })
})

server.del('/patients/:id', function (req, res, next) {
    
      
      patientSave.delete(req.params.id, function (error, patient) {
    
       
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        
        res.send()
      })
    })
