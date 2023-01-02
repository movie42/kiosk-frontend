export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}
const ModalHeader = ({ title, subtitle, ...props }: ModalHeaderProps) => {
  return (
    <div {...props}>
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default ModalHeader;
