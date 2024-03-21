import { FC, ReactNode } from "react";

interface AspectRatioProps {
  ratio?: "16/9" | "4/3" | "1/1" | "3/4" | "9/16";
  children: ReactNode;
}

export const AspectRatio: FC<AspectRatioProps> = ({
  children,
  ratio = "16/9",
}) => {
  const ratioIndex = Number(ratio.split("/")[1]) / Number(ratio.split("/")[0]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: `${ratioIndex * 100}%`,
      }}
    >
      <div
        className="[&_*]:w-full [&_*]:h-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};
