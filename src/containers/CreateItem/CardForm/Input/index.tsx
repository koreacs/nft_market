import * as React from 'react';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  return (
    <div className="mb-3">
      <input type="text" className="form-control" {...props} />
    </div>
  );
};

export default Input;
