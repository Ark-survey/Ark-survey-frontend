import { Box, Sx } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useIsMobile } from 'src/hooks/useIsMobile';
import CharAvatar, { CharAvatarProps } from '.';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

export interface DraggableCharAvatarProps {
  avatarKey: string;
  sx?: Sx;
  charName?: string;
  hidden?: boolean;
  nameDisplay?: boolean;
  readonly?: boolean;
  mini?: boolean;
  skinDisabled?: boolean;
  selecting?: boolean;
  onClick?: () => void;
  metaInfo?: {
    fromTierValue?: number;
  };
  dragDisabled?: boolean;
  children?: ReactNode;
}

export interface CharDragItem {
  type?: 'char-box' | 'tier-list';
  charKey?: string;
  fromTierValue?: number;
}

// Need use children to display the normal status.
export const DraggableCharAvatar = ({
  charDragItem,
  children,
  ...args
}: CharAvatarProps & { charDragItem: CharDragItem }) => {
  const isMobile = useIsMobile();

  const [{ isDragging }, dragger] = useDrag(
    () => ({
      type: ItemTypes.OPERATOR,
      item: charDragItem,
      canDrag: !isMobile,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [charDragItem, isMobile],
  );

  return (
    <Box ref={dragger}>
      {isDragging ? <CharAvatar {...args} overlayDisplay overlayText="拖拽中" readonly /> : children}
    </Box>
  );
};

export const PickedCharAvatar = ({ ...args }: CharAvatarProps) => {
  return <CharAvatar {...args} overlayDisplay overlayText="已选择" readonly />;
};

export const HasCharAvatar = ({ ...args }: CharAvatarProps) => {
  return <CharAvatar {...args} overlayDisplay overlayText="已持有" readonly />;
};

export const RemovableAvatar = ({ onDeleteConfirm, ...args }: CharAvatarProps & { onDeleteConfirm: () => void }) => {
  const [selected, setSelected] = useState(false);
  return selected ? (
    <CharAvatar
      {...args}
      overlayDisplay
      overlayText="删除"
      onClick={() => {
        onDeleteConfirm?.();
        setSelected(false);
      }}
    />
  ) : (
    <CharAvatar {...args} onClick={() => setSelected(true)} />
  );
};
