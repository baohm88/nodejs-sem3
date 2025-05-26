import { Button } from "react-bootstrap";

const IconButton = ({
    icon,
    onClick,
    variant = "light",
    style = {},
    ...props
}) => (
    <Button
        variant={variant}
        onClick={onClick}
        style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1000,
            padding: 0,
            ...style,
        }}
        {...props}
    >
        {icon}
    </Button>
);

export default IconButton;
