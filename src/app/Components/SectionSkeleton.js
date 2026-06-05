// src/app/Components/SectionSkeleton.js
export default function SectionSkeleton({ height = "400px" }) {
  return (
    <div
      style={{ minHeight: height, width: "100%" }}
      aria-hidden="true"
    />
  );
}
