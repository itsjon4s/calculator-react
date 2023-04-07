import "./styles.css";

interface ButtonProps {
  label: string;
  operation?: boolean;
  double?: boolean;
  triple?: boolean;
  click: (content: string) => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={() => props.click(props.label)}
      className={`button ${props.operation ? "operation" : ""} ${
        props.double ? "double" : ""
      } ${props.triple ? "triple" : ""}`}
    >
      {props.label}
    </button>
  );
}
