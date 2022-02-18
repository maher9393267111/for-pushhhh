
const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// req.files.file.path
exports.upload = async (req, res) => {

try{   // save image in cloudinary
  let result = await cloudinary.uploader.upload(req.body.image, { 
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png



  });

console.log(req.body.image)
console.log('heloooo>>>>>>>>>>>>> image * _ * ')

  res.json({  // response this data in react
    public_id: result.public_id, // public key of image that saved in cloudinary storage
    url: result.secure_url, // images coming from cloudinary after post it from form in reactjs
  });



}

catch(err){
  console.log(err)

  console.log('whatssssss happpend >>>> here')
  res.status(400).json({message:err})


}

 
};





exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });

};
