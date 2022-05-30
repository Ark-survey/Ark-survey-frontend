import { keyframes, Box, Group, Modal, Text, Transition } from '@mantine/core';
import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Refresh } from 'tabler-icons-react';
import { persistor, RootState } from './store';
import { updateUserData } from './store/slice/userSlice';

const a1 = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

let current = 'Unchanged';
const subscriptions = new Set();

function subscribe(setStatus: any) {
  subscriptions.add(setStatus);

  return () => {
    subscriptions.delete(setStatus);
  };
}

function statusDispatch(status: string) {
  current = status;
  subscriptions.forEach((setStatus: any) => setStatus(status));
}

function useStatus() {
  const [status, setStatus] = useState(current);
  useEffect(() => subscribe(setStatus), []);

  return status;
}

// Updated but waiting for stale tabs to close
function onUpdate(_registration: any) {
  statusDispatch('Updated');
}

// Updated and running
function onSuccess(_registration: any) {
  statusDispatch('Successful');
}

function UpdateVersionNotion() {
  const [opened, setOpened] = useState(false);
  const user = useSelector((state: RootState) => state.user.userData);

  const state = useStatus();
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    // update event
    const id = user?.id ?? '';
    await persistor.flush();
    dispatch(updateUserData({ id }));
    setOpened(false);
    navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
  };

  useEffect(() => {
    setOpened(state === 'Updated');
  }, [state]);

  return (
    <Modal
      opened={opened}
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      onClose={() => setOpened(false)}
    >
      <Group position="apart" sx={{ userSelect: 'none' }}>
        <Text>{t('versionUpdate.notion')}</Text>
        <Box sx={{ height: '24px', animationName: a1, animationDuration: '3s', animationIterationCount: 'infinite' }}>
          <Refresh />
        </Box>
      </Group>
    </Modal>
  );
}

export { UpdateVersionNotion, onUpdate, onSuccess };
