import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../config/config'


const RTE = ({ name, control, label, defaultValue = "" }) => {
    return (
        <div className='w-full'>
            {
                label && <label className='inline-block pl-1 mb-1'>{label}</label>
            }
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={config.tinyMceKey}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                                'alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                        }}
                        onEditorChange={onChange}
                    />

                )}
            />


        </div>
    )
}

export default RTE