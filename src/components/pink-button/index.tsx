import { Button, ButtonProps, styled } from "@mui/material";
import { pink } from "@mui/material/colors";

interface PinkButtonProps extends ButtonProps {
  selected?: boolean;
}

const PinkButton = styled(Button)<PinkButtonProps>(({ theme, selected }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: selected ? pink[500] : pink[200],
  '&:hover': {
    backgroundColor: selected ? pink[500] : pink[200],
  }
}));

export default PinkButton;