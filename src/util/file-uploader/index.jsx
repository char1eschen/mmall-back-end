import React from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends React.Component{
  render(){
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName: 'upload_file',
      dataType: 'json',
      chooseAndUpload: true,
      uploadSuccess: (res) => {
        this.props.onSuccess(res.data);
      },
      upLoadError: (err) => {
        this.props.onError(err.message || 'Upload image failed');
      }
    }
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
      <FileUpload options={options}>
        <button className="btn btn-xs btn-default" ref="chooseAndUpload">Upload image</button>
      </FileUpload>
    )         
  }
}

export default FileUploader;
