const cloudinary = require('cloudinary');
// cloudinary configuration for saving files
cloudinary.config({
    cloud_name: 'mustyz',
    api_key: '727865786596545',
    api_secret: 'HpUmMxoW8BkmIRDWq_g2-5J2mD8'
})

exports.upload = async (filePath)=>{
    let resultt
    await cloudinary.v2.uploader.upload(filePath, 
        { resource_type: "raw" }, 
        async function(error, result) {
          console.log('111111111111111111',result, error); 
          
          resultt = result.secure_url
      })
      return resultt
}

exports.delete = async (image) => {
    const imageName = image.split('/').splice(7)
    console.log('-----------------',imageName)

        cloudinary.v2.api.delete_resources_by_prefix(imageName[0], 
    {
      invalidate: true,
        resource_type: "raw"
    }, 
      function(error,result) {
        console.log('33333333',result, error)
    });
}