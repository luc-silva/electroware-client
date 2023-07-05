interface ISVGButtonComponentProps {
    sizing?: number;
    onClick: React.MouseEventHandler;
    weight?:  "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}