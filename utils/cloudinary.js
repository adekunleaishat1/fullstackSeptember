const cloudinary = require("cloudinary").v2


cloudinary.config({ 
    cloud_name: 'daniyfc28', 
    api_key: '316854624746645', 
    api_secret: process.env.CLOUDINARY_APISCERET
});



module.exports = cloudinary