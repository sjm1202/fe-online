import React, { ReactNode, useState } from 'react';
import { Button, Popconfirm } from 'antd';
interface Iprops {
  btnProps?: any;
  onSubmit?: Function;
  isConfirm?: boolean;
  children?: ReactNode;
}
const SubmitBtn: React.FC<Iprops> = (props) => {
  const {
    btnProps = {},
    onSubmit,
    isConfirm = false,
    children,
  } = props;
  let [ submitLoading, setSubmitLoading ] = useState(false);
  const handleConfirm = () => {
    handleSubmit();
  }
  const handleSubmit = async () => {
    setSubmitLoading(true)
    try {
      await onSubmit?.();
    } catch (error) {
      //
    }
    setSubmitLoading(false)
  }
  return isConfirm ? (
    <Popconfirm
      title="确认执行该操作吗?"
      onConfirm={handleConfirm}
    >
      <Button {...btnProps} loading={submitLoading}>{children}</Button>
    </Popconfirm>
  ) : <Button {...btnProps} loading={submitLoading} onClick={handleSubmit}>{children}</Button>
}
export default SubmitBtn;