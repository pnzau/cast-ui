import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DraggableProps } from './defaultProps';
import { Themes } from '../themes';

export type Props = Partial<DraggableProps>;

const SDraggableFooter = styled.div`
  position: relative;
  padding: ${(props: Props) =>
    `${
      props.theme.common[props.gutterSize!].padding.toString().split(' ')[0]
    } 0`};
`;

export const DraggableFooter: React.FunctionComponent<Props> = ({
  theme,
  ...props
}) => (
  <ThemeProvider theme={(outerTheme: any) => outerTheme || theme}>
    <SDraggableFooter {...props}>{props.children}</SDraggableFooter>
  </ThemeProvider>
);
DraggableFooter.defaultProps = {
  gutterSize: 'md',
  draggableStyle: 'primary',
  theme: Themes.defaultTheme,
};
