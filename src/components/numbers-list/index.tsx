import { NumberModel } from "../../models/number-model";
import PinkButton from "../pink-button";
import { NumContent } from "./styles";

interface NumbersListProps {
  numbers: NumberModel[];
  selectedNumbers: NumberModel[];
  onSelect: (num: NumberModel) => void;
}

const NumbersList = ({ numbers, selectedNumbers, onSelect }: NumbersListProps) => {

  const handleNumberClick = (model: NumberModel) => {
    onSelect(model);
  }

  return (
    <NumContent>
      {numbers.map((n, index) =>
        <PinkButton
          key={index}
          variant="contained"
          size="large"
          disabled={n.inUse}
          onClick={() => handleNumberClick(n)}
          selected={selectedNumbers.includes(n)}
        >
          {n.number.toString()}
        </PinkButton>
      )}
    </NumContent>
  );
}

export default NumbersList;