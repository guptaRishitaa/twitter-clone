export const uploadToCloudinary=async(pics)=>{

    if(pics){
        const data=new FormData();
        data.append("file",pics)
        data.append("upload_preset","TwitterClone");
        data.append("clooud_name", "dv60j7ycb")

        const res=await fetch("https://api.cloudinary.com/v1_1/dv60j7ycb/image/upload",{
            method:"post",
            body:data
        })

        const fileData=await res.json();
        return fileData.url.toString();


    }

    else console.log("error from upload function")
}