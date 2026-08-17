import React from "react";

type SectionMetaProps = {
  index: string;
  label: string;
};

const SectionMeta: React.FC<SectionMetaProps> = ({ index, label }) => {
  return (
    <p className="sectionMeta">
      <span>// {index}</span>
      <span>{label}</span>
    </p>
  );
};

export default SectionMeta;
