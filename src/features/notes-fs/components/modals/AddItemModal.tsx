import {
  Button,
  UseDisclosureProps,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FC, PropsWithChildren, ReactNode } from "react";

export interface BaseAddItemModalProps extends UseDisclosureProps {}

interface AddItemModalProps extends BaseAddItemModalProps {
  header: ReactNode;
  onSubmit: () => Error | void;
  canSubmit: boolean;
}

export const AddItemModal: FC<PropsWithChildren<AddItemModalProps>> = ({
  isOpen,
  onClose,
  header,
  children,
  canSubmit,
  onSubmit,
}) => (
  <Modal size="md" backdrop="blur" isOpen={isOpen} onClose={onClose}>
    <ModalContent className="bg-background text-foreground">
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button isDisabled={!canSubmit} color="primary" onPress={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);
