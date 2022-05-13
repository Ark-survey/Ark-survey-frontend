
import { Check, X } from "tabler-icons-react";
import { showNotification } from '@mantine/notifications';

export function successNotice(message: string, title?: string) {
  showNotification({
    color: 'green',
    icon: <Check />,
    title,
    message,
  })
}

export function errorNotice(message: string, title?: string) {
  showNotification({
    color: 'red',
    icon: <X />,
    title,
    message,
  })
}