import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Icon from 'react-icons-kit';
import { ic_view_headline as icViewHeadline } from 'react-icons-kit/md/ic_view_headline';
import { Themes } from '../themes';

export type Props = {
  /** Activae Hover handle  */
  onMouseEnter?: Function;
  /** Deactivate Hover handle  */
  onMouseLeave?: Function;
  /** Listen to drag start events  */
  onDragStart?: Function;
  /**
   * Listen to drag start events
   *
   * @default true
   * */
  draggable?: boolean;
  /**
   * Pass in Handle Icon iconSize
   *
   * @default '40'
   **/
  size?: number;
  /**
   * Pass in Handle css className
   *
   * @default 'handleIcon'
   **/
  className?: string;
  /**
   * From theme provider
   *
   * @default defaultTheme
   **/
  theme?: any;
};

export const DraggableHandle: React.FunctionComponent<Props> = ({
  theme,
  ...props
}) => (
  <ThemeProvider theme={(outerTheme: any) => outerTheme || theme}>
    <div
      onMouseEnter={() => props.onMouseEnter}
      onMouseLeave={() => props.onMouseLeave}
    >
      <Icon
        icon={icViewHeadline}
        {...props}
        className={`handleIcon ${props.className}`}
      />
      {props.children}
    </div>
  </ThemeProvider>
);
DraggableHandle.defaultProps = {
  size: 25,
  theme: Themes.defaultTheme,
};
