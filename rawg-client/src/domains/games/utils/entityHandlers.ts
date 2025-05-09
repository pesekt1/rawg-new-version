import { Entity } from "../components/GameForm/Entity";

export const handleAdd = (
  toAdd: number | "",
  setToAdd: (v: number | "") => void,
  selected: Entity[],
  setSelected: (v: Entity[]) => void,
  data: { results: Entity[] } | undefined
) => {
  if (toAdd && !selected.some((g) => g.id === toAdd) && data?.results) {
    const obj = data.results.find((g) => g.id === toAdd);
    if (obj) {
      setSelected([...selected, obj]);
      setToAdd("");
    }
  }
};

export const handleRemove = (
  id: number,
  selected: Entity[],
  setSelected: (v: Entity[]) => void
) => {
  setSelected(selected.filter((g) => g.id !== id));
};
