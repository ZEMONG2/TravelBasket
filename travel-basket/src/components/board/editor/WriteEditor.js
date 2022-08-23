import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WriteEditor = ({desc, setDesc, setImage}) => {
    const [flag, setFlag] = useState(false);    // 첫 이미지를 썸네일로 지정
    const imgLink = "http://localhost:8008/uploads"
    // console.log('에디터',article);

    const customUploadAdapter = (loader) => {
        return {
            upload() {
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then((file) => {
                        data.append("name", file.name);
                        data.append("file", file);
                        // data.append("content", data);
                        axios
                            .post('http://localhost:8008/api/upload', data)
                            .then((res) => {
                                if(!flag) {
                                    setFlag(true);
                                    setImage(res.data.filename);
                                    console.log("오냐?")
                                }
                                resolve({
                                    default: `${imgLink}/${res.data.filename}`
                                });
                            })
                            .catch((err) => reject(err));
                            // console.log(file.name);
                            // console.log(res.data.filename);
                    });

                })
            }
        }
    }


    function uploadPlugin (editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }

    return ( 
        <CKEditor
                editor={ClassicEditor}
                config={{extraPlugins: [uploadPlugin]}}
                data={desc? desc: ""}
                onReady={editor => { 
                    // console.log('Editor Ready', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // setContent(data);
                    setDesc(data);
                    // console.log(desc);
                    // console.log('데이터', data)
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus', editor);
                }}

                // data={data}
            />
    );
};

export default WriteEditor;