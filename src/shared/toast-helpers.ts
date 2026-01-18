import { toast } from 'sonner';

export function showSuccessToast(message: string) {
  return toast.success(message);
}

export function showErrorToast(message: string) {
  return toast.error(message);
}

export function showInfoToast(message: string) {
  return toast.info(message);
}

export function showWarningToast(message: string) {
  return toast.warning(message);
}
