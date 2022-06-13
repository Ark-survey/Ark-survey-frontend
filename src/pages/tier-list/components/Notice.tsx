import { IconCheck, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

export function successNotice(message: string, title?: string) {
  showNotification({
    color: 'green',
    icon: <IconCheck />,
    title,
    message,
    autoClose: 2000,
  });
}

export function errorNotice(message: string, title?: string) {
  showNotification({
    color: 'red',
    icon: <IconX />,
    title,
    message,
    autoClose: 2000,
  });
}
