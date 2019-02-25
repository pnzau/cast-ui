import * as React from 'react';
import styled from 'styled-components';
import { DraggableProps } from '../defaultProps';
import { DraggableHandle } from '../';
import DraggableContext, { useMergeWithParentProps } from '../draggableContext';

type Props = Partial<DraggableProps> & {
  /** Listen to drag start event  */
  onDragStart?(e: React.MouseEvent<HTMLElement>): void;
  /** Listen to drag over event  */
  onDragOver?(e: React.MouseEvent<HTMLElement>): void;
  /** Listen to drop event  */
  onDrop?(e: React.MouseEvent<HTMLElement>): void;
  /**
   * Listen to drag start events
   *
   * @default true
   * */
  draggable?: boolean;
  /**
   * Size of the handle in the draggable item
   *
   * @default '30'
   **/
  itemhandlesize?: number;
  /**
   * Optionally show the handle in the draggable item
   *
   * @default 'true'
   **/
  showitemhandle?: boolean;
  /**
   * From theme provider
   *
   * @default defaultTheme
   **/
  theme?: any;
};

const SItemContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: start;
  background: ${(props: Props) => props.theme.colors.white};
  border: 1px solid ${(props: Props) => props.theme.colors[props.bordercolor!]};
  border-radius: ${(props: Props) =>
    props.theme.common[props.guttersize!].borderRadius};
  margin: ${(props: Props) =>
    `${
      props.theme.common[props.guttersize!].padding.toString().split(' ')[0]
    } 0`};
  > * {
    display: flex;
    align-items: center;
  }
`;

const SItemLeftContent = styled.div`
  position: relative;
  border-right: 1px solid
    ${(props: Props) => props.theme.colors[props.bordercolor!]};
  .itemHandle {
    cursor: ${(props: any) => (props.itemDraggable ? 'grab' : 'not-allowed')};
    color: ${(props: Props) => props.theme.colors[props.bordercolor!]};
    padding: ${(props: Props) =>
      `calc(${
        props.theme.common[props.guttersize!].padding.toString().split(' ')[0]
      } / 2)`};
  }
  &:hover {
    background-color: ${(props: Props) => props.theme.colors.panelBackground};
    .itemHandle {
      color: ${(props: any) =>
        props.itemDraggable
          ? props.theme.colors.blue
          : props.theme.colors[props.bordercolor!]};
    }
  }
`;

export const ItemContainer: React.FunctionComponent<Props> = (props: any) => {
  const [itemActive, setItemActive] = React.useState(false);
  const parentProps = React.useContext(DraggableContext).parentProps;
  const propsToMerge = [
    { key: 'guttersize', defaultVal: 'md' },
    { key: 'draggablestyle', defaultVal: 'primary' },
    { key: 'color', defaultVal: 'lightGray' },
    { key: 'bordercolor', defaultVal: 'lightGray' },
    { key: 'draggable', defaultVal: props.draggable },
  ];
  const newProps: any = useMergeWithParentProps(props, {
    propsToMerge,
    parentProps,
  });
  return (
    <SItemContainer
      {...newProps}
      key="draggableItem"
      draggable={itemActive && newProps.draggable}>
      {newProps.showitemhandle && (
        <SItemLeftContent
          {...newProps}
          draggable={false}
          itemDraggable={itemActive && newProps.draggable}>
          <DraggableHandle
            size={newProps.itemhandlesize}
            className="itemHandle"
            onMouseEnter={() => setItemActive(true)}
            onMouseLeave={() => setItemActive(false)}
          />
        </SItemLeftContent>
      )}
      {props.children}
    </SItemContainer>
  );
};

export default ItemContainer;