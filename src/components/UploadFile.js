import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadFiles = (props) => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [progressInfos, setProgressInfos] = useState({ val: [] });
    const [message, setMessage] = useState([]);
    const [fileInfos, setFileInfos] = useState([]);
    const progressInfosRef = useRef(null)

    useEffect(() => {
        if(props.files != null && selectedFiles != null){
          const files = Array.from(selectedFiles);
          props.files(files);
        }
        // if(props.delete){
        //   clearInput(props.delete)
        // }
        
      }, [selectedFiles]);

      const selectFiles = (event) => {
        setSelectedFiles("")
        let sizeOfArray
        if(selectedFiles != undefined){
          sizeOfArray = event.target.files.length + selectedFiles.length;
        } else {
          sizeOfArray = event.target.files.length
        }
        if(sizeOfArray <= 3){
          setSelectedFiles(event.target.files);
          setProgressInfos({ val: [] });
        } else {
          event.target.value = null;
          errorMessage("Too many files")
        }
      };

      // const clearInput = (deleteFiles) => {
      //   if(deleteFiles===true){
      //     this.fileInput.value = "";
      //   }
      //   props.delete = false;
      // }

      const errorMessage = (text) =>{
        toast.error(text, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

      return (
        <div>
          {progressInfos && progressInfos.val.length > 0 &&
            progressInfos.val.map((progressInfo, index) => (
              <div className="mb-2" key={index}>
                <span>{progressInfo.fileName}</span>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-info"
                    role="progressbar"
                    aria-valuenow={progressInfo.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progressInfo.percentage + "%" }}
                  >
                    {progressInfo.percentage}%
                  </div>
                </div>
              </div>
            ))}
    
          <div className="row my-3">
            <div className="col-8">
              <label className="btn btn-default p-0">
                <input id="file_input" type="file" multiple onChange={selectFiles} id="group_image" accept="image/*"/>
              </label>
            </div>
    
          </div>
    
          {message.length > 0 && (
            <div className="alert alert-secondary" role="alert">
              <ul>
                {message.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          )}
    
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    
};

export default UploadFiles;