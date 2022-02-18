import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar,Badge } from "antd";

// res.json({
//     public_id: result.public_id,
//     url: result.secure_url,
//   });


const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.images;  // have all uploaded images

    if (files) { // if i have iny image files i well resize them by loop
      setLoading(true);
      for (let i = 0; i < files.length; i++) {  // loop all ihave images
        Resizer.imageFileResizer(  // resize all loop images
          files[i],    // image number
          720,     // image width
          720,     // image height
          "JPEG",    // image type
          100,  // image quality
          0,
          (uri) => {    // generate uri to image and send it to backemd as req.body image
             console.log(uri);
            axios
              .post(  

                // send images to backend
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri }, // image is {req.body.image} in backend
                {
                  headers: {
                    authtoken:  user.token ,
                  },
                }
              )
              .then((res) => {

            //          public_id: result.public_id,
//                      url: result.secure_url,
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);

                //res.data is images that saved in cloudinary
                allUploadedFiles.push(res.data); // push backend data to values.image array

               //when update new image images array well updated and added new image to array

                setValues({ ...values, images: allUploadedFiles }); //pushed data in images array
              })



              .catch((err) => {   // if there any error message show it in catch callback
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };



// remove image from cloudinary


const handleImageRemove = (public_id) => {
  setLoading(true);
  // console.log("remove image", public_id);
  axios
    .post(
      `${process.env.REACT_APP_API}/removeimage`,
      { public_id }, // remove by image public id
      {
        headers: {
          authtoken: user ? user.token : "",
        },
      }
    )
    .then((res) => {
      setLoading(false);
      const { images } = values;

      // after delete id filter this id from images array
      let filteredImages = images.filter((item) => {
        return item.public_id !== public_id;
      });

    // afte that set images after delete the image by id
      setValues({ ...values, images: filteredImages });
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};












  return (
    <>

<div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer",paddingBottom:'10px' }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3 pb-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    
    </>
  );
};

export default FileUpload;
