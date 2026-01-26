import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { ModalPayload } from './modal.types';

type ModalState = {
  modal: ModalPayload | null;
  openModal: (modal: ModalPayload) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));

export const useActiveModal = () =>
  useModalStore(useShallow((state) => state.modal));

export const useModalActions = () =>
  useModalStore(
    useShallow((s) => ({
      openModal: s.openModal,
      closeModal: s.closeModal,
    }))
  );
