import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { theme } from 'src/theme';

import styles from './styles.module.css';

type BoxProps = {
  tag?: keyof React.ReactHTML;

  display?: CSSProperties['display'];
  overflow?: CSSProperties['overflow'];

  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexGrow?: CSSProperties['flexGrow'];
  flexWrap?: CSSProperties['flexWrap'];

  gap?: CSSProperties['gap'];
  padding?: CSSProperties['padding'];
  margin?: CSSProperties['margin'];

  width?: CSSProperties['width'];
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];

  height?: CSSProperties['height'];
  minHeight?: CSSProperties['minHeight'];
  maxHeight?: CSSProperties['maxHeight'];

  backgroundColor?: keyof typeof theme.colors;
  border?: keyof typeof theme.colors;
  borderRadius?: CSSProperties['borderRadius'];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Box = (props: BoxProps) => {
  const {
    tag = 'div',
    display = 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    flexGrow,
    gap,
    padding,
    margin,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    backgroundColor,
    border,
    borderRadius,
    className,
    style,
    overflow,
    ...otherProps
  } = props;

  const completeClassName = clsx([
    display ? styles[`display_${display}`] : '',
    alignItems ? styles[`alignItems_${alignItems}`] : '',
    justifyContent ? styles[`justifyContent_${justifyContent}`] : '',
    flexWrap ? styles[`flexWrap_${flexWrap}`] : '',
    flexDirection ? styles[`flexDirection_${flexDirection}`] : '',
    className || '',
  ]);

  return React.createElement(
    tag,
    {
      className: completeClassName,
      style: {
        overflow,
        gap,
        padding,
        margin,
        width,
        minWidth,
        maxWidth,
        height,
        minHeight,
        maxHeight,
        backgroundColor: backgroundColor ? theme.colors[backgroundColor] : undefined,
        border: border ? `1px solid ${theme.colors[border]}` : undefined,
        borderRadius,
        flexGrow,
        ...(style || {}),
      },
      ...otherProps,
    },
    props.children,
  );
};
