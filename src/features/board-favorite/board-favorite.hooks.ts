import { addFavoriteBoard, removeFavoriteBoard } from './board-favorite.api';
import { createFavoriteMutation } from './use-board-favorite';

export const useFavoriteBoard = createFavoriteMutation(addFavoriteBoard, 'add');

export const useUnfavoriteBoard = createFavoriteMutation(
  removeFavoriteBoard,
  'remove'
);
