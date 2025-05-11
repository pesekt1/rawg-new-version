import { Entity } from "../components/GameForm/Entity";

/**
 * Adds an entity to the selected list if it is not already selected and exists in the provided data.
 *
 * @param toAdd - The ID of the entity to add.
 * @param setToAdd - Function to reset the `toAdd` state.
 * @param selected - The current list of selected entities.
 * @param setSelected - Function to update the selected entities list.
 * @param data - The data containing available entities.
 */
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

/**
 * Removes an entity from the selected list by its ID.
 *
 * @param id - The ID of the entity to remove.
 * @param selected - The current list of selected entities.
 * @param setSelected - Function to update the selected entities list.
 */
export const handleRemove = (
  id: number,
  selected: Entity[],
  setSelected: (v: Entity[]) => void
) => {
  setSelected(selected.filter((g) => g.id !== id));
};
