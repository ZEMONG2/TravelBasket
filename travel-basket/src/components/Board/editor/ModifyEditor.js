import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import dotenv from "dotenv";
// import {v4} from "uuid";
// dotenv.config();

const ModifyEditor = ({ desc, setDesc, setImage, content, setContent }) => {
  const [flag, setFlag] = useState(false); // 첫 이미지를 썸네일로 지정
  const imgLink = 'http://localhost:8000/uploads';
  // console.log('에디터',article);

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append('name', file.name);
            data.append('file', file);
            // data.append("content", data);
            axios
              .post('http://localhost:8000/api/upload', data)
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                  setImage(res.data.filename);
                  console.log('여기인가그럼?');
                }
                resolve({
                  default: `${imgLink}/${res.data.filename}`,
                });
              })
              .catch((err) => reject(err));
            // console.log(file.name);
            // console.log(res.data.filename);
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{ extraPlugins: [uploadPlugin] }}
      data={content ? content : ''}
      onReady={(editor) => {
        // console.log('Editor Ready', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
        setDesc(data);
        // console.log(desc);
        // console.log('데이터', data);
      }}
      onBlur={(event, editor) => {
        // console.log('Blur', editor);
      }}
      onFocus={(event, editor) => {
        // console.log('Focus', editor);
      }}
    />
  );
};

export default ModifyEditor;
