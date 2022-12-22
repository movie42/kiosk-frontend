interface ModalHeaderProps {
  title: string;
  subtitle: string;
}
const ModalHeader = ({ title, subtitle }: ModalHeaderProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default ModalHeader;
