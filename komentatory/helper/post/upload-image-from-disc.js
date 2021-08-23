// import { showPreloader, hidePreloader } from "./common";
// import { getRouteToTemponaryFile } from "./../../../lib/routes";
// import { checkUrlIsImage } from "./../../../lib/common";
// import { imageExtensionError, fileSizeError,unknownError } from "./../../../lib/errors";
// import {setNewFileUploaded,setNewTemponaryImageID} from './../post-new';

// export const initUploadImageFromDisc = () => {
//   const inputFile = document.querySelector("#file");
//   inputFile.addEventListener("change", event => {
//     const file = document.querySelector("[type=file]").files[0];
//     const url = "/upload-temponary-image";
//     const clipboard = document.querySelector(".create__post-clipboard");
//     const inputDiscTemponaryImage = document.querySelector(
//       "#disc_temponaryImage"
//     );
//     const errorFrame = document.querySelector(".field-error__frame--file");
//     const temponaryImageIDInput =  document.querySelector("#temponaryImageID");
//     const formData = new FormData();
//     formData.append("file", file);

//     $.ajax({
//       url: url,
//       data: formData,
//       type: "post",
//       contentType: false,
//       processData: false,
//       cache: false,
//       dataType: "json",
//       beforeSend: function() {
//         showPreloader();
//         clipboard.innerHTML = "";
//         inputDiscTemponaryImage.value = "";
//       },
//       error: function(err) {
//         console.error(err.responseText);
//       },
//       success: function(data) {
//         let { status, fileUploaded, isImage,temponaryImageID,isValidSize } = data;
//         if(status =='success'){
//           if (!isImage) {
//             errorFrame.innerText = imageExtensionError;
//             errorFrame.style.display = "block";
//           }else if(!isValidSize){
//             errorFrame.innerText = fileSizeError ;
//             errorFrame.style.display = "block";
//             }
//            else if (fileUploaded) {
//             let image = `<img class="" src="${getRouteToTemponaryFile()}${fileUploaded}"/>`;
//             temponaryImageIDInput.value = temponaryImageID;
//             inputDiscTemponaryImage.value = fileUploaded;
//             clipboard.innerHTML = image;
//             setNewFileUploaded(fileUploaded);
//             setNewTemponaryImageID(temponaryImageID);
//           }
//         }else {
//           errorFrame.innerText = unknownError;
//           errorFrame.style.display = "block";
//         }
    

//         hidePreloader();
//       },
//       complete: function() {}
//     });
//   });
// };
