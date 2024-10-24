const Validator = (schema)=>async (req, res,next) =>{
    try {
       const body = req.body 
      const validate = await schema.validate(body)
      if (validate) {
        next()
      }
    } catch (error) {
        res.status(409).send({message:error.message, status:false})
    }

}


module.exports = {Validator}