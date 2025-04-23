import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Field {
  name: string;
  label: string;
  type?: string;
}

interface GenericEditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  entity: T;
  fields: Field[];
  onSave: (updated: Partial<T>) => Promise<void> | void;
  title?: string;
}

function GenericEditModal<T>({
  isOpen,
  onClose,
  entity,
  fields,
  onSave,
  title,
}: GenericEditModalProps<T>) {
  const [form, setForm] = useState<Partial<T>>(entity);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  // Reset form when entity changes or modal opens
  useEffect(() => {
    setForm(entity);
  }, [entity, isOpen]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(form);
      toast({
        title: "Saved.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Failed to save.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || "Edit"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {fields.map((field) => (
            <FormControl key={field.name} mb={3}>
              <FormLabel>{field.label}</FormLabel>
              <Input
                type={field.type || "text"}
                value={(form as any)?.[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            </FormControl>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3} variant="ghost">
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave} isLoading={isSaving}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GenericEditModal;
