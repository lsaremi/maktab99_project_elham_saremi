import React, { useEffect, useRef } from "react";

function Editor({
  onChange,
  editorLoaded,
  name,
  value,
  children,
  condition,
  error,
}) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div className="mb-5 w-full">
      <label className="block text-orange-300 text-sm font-bold text-right mb-2">
        <div className="flex items-center gap-4">
          توضیحات :
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>

      <div>
        {editorLoaded ? (
          <CKEditor
            type=""
            name={name}
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
          >
            {children}
          </CKEditor>
        ) : (
          <div>Editor loading</div>
        )}
      </div>
    </div>
  );
}

export default Editor;
