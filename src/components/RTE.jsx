import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../config/config'
import { useTheme } from '../utils/ThemeContext'

const RTE = ({ name, control, label, defaultValue = "" }) => {
    const { theme } = useTheme();
    const editorRef = useRef(null);

    const editorConfig = {
        height: 500,
        menubar: true,
        skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: theme === 'dark' ? 'dark' : 'default',
        plugins: [
            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
        content_style: `
            body {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: ${theme === 'dark' ? '#ffffff' : '#000000'};
                background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            }
        `,
        branding: false,
        promotion: false,
        statusbar: false,
        resize: false,
        setup: (editor) => {
            editorRef.current = editor;
            editor.on('init', () => {
                const body = editor.getBody();
                if (body) {
                    body.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
                    body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
                }
            });
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current;

            // Update editor container theme
            const container = editor.getContainer();
            if (container) {
                container.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
                container.style.color = theme === 'dark' ? '#ffffff' : '#000000';
            }

            // Update editor body theme
            const body = editor.getBody();
            if (body) {
                body.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
                body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
            }

            // Update editor theme using theme manager
            try {
                const themeManager = editor.theme;
                if (themeManager) {
                    themeManager.setSkin(theme === 'dark' ? 'oxide-dark' : 'oxide');
                    themeManager.setContentCss(theme === 'dark' ? 'dark' : 'default');
                }
            } catch (error) {
                console.log('Could not update theme settings');
            }
        }
    }, [theme]);

    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block pl-1 mb-1 text-theme'>
                    {label}
                </label>
            )}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={config.tinyMceKey}
                        initialValue={defaultValue}
                        init={editorConfig}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE