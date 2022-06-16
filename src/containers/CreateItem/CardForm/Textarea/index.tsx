import * as React from 'react';

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FunctionComponent<ITextareaProps> = (props) => {
  return (
    <div className="mb-3">
      <textarea
        name="desc"
        id="desc"
        cols={30}
        className="form-control"
        rows={6}
        {...props}
      ></textarea>
    </div>
  );
};

export default Textarea;
