import RingLoader from "react-spinners/RingLoader";

export default function Loader() {
  return (
    <RingLoader
      color="var(--color-accent)"
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
