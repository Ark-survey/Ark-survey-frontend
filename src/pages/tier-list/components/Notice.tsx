import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

export function successNotice(message: string, title?: string) {
  showNotification({
    color: 'green',
    icon: <Check />,
    title,
    message,
    autoClose: 2000,
  });
}

export function errorNotice(message: string, title?: string) {
  showNotification({
    color: 'red',
    icon: <X />,
    title,
    message,
    autoClose: 2000,
  });
}
