import type { ReactElement } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

interface ResponsiveDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  trigger?: ReactElement;
  footer?: ReactElement;
}

export const ResponsiveDialog = ({
  open,
  onOpenChange = () => {},
  trigger,
  title,
  description,
  footer,
  children,
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger render={trigger} />
        <DialogContent className='max-h-[98%] overflow-hidden px-0 w-full'>
          <DialogHeader className='px-6'>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className='flex-1 px-6 py-2 overflow-y-auto'>{children}</div>
          {footer ? (
            <DialogFooter className='px-6'>{footer}</DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='max-h-[98%] overflow-hidden px-0 w-full'>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className='flex-1 w-full h-full px-4 py-2 overflow-y-auto'>
          {children}
        </div>
        {footer ? <DrawerFooter className='px-4'>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </Drawer>
  );
};
