import style from "./Text.module.css";

export default function Text({ children, textAlign = "", marginBottom = "0" }) {
  return (
    <p
      className={[
        style["text"],
        style[textAlign],
        style[`marginBottom${marginBottom}`],
      ].join(" ")}
    >
      {children}
    </p>
  );
}
