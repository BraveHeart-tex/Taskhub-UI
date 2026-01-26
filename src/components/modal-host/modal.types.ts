export type ModalPayload =
  | { type: 'create-workspace' }
  | { type: 'create-board'; workspaceId: string };

export type ModalType = ModalPayload['type'];
