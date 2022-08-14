import FcFormIconButtonClear from "./fc-form-icon-button-clear";
export default function FcFormClearButton(props: { onClick: () => void }) {
  const { onClick } = props;
  return <FcFormIconButtonClear description="limpar" onClick={onClick} />;
}
