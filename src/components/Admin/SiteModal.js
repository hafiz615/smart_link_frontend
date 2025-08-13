import { Modal, ModalContent } from "./styles";
import SiteForm from "../Site/SiteForm/SiteForm";

const SiteModal = ({ site, onClose }) => {
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SiteForm site={site} onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default SiteModal;
