export const uploadToCloudinary=async(pics,fileType)=>{

    if(pics){
        const data=new FormData();
        data.append("file",pics)
        data.append("upload_preset","TwitterClone");
        data.append("clooud_name", "dv60j7ycb")

        const res=await fetch(`https://api.cloudinary.com/v1_1/dv60j7ycb/${fileType}/upload`,{
            method:"post",
            body:data
        })

        const fileData=await res.json();
        console.log("url : ", fileData.url.toString());
        return fileData.url.toString();


    }

    else console.log("error from upload function")
}