import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

const StyledEditor = styled.div`
  margin: 10px 0;
  width: 100%;

  .ck-content {
    height: 250px;
    padding: 10px 20px;
  }
`;

function Richtext({ data, onchange }) {
  return (
    <StyledEditor>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          onchange(data);
        }}
      />
    </StyledEditor>
  );
}

export default Richtext;
