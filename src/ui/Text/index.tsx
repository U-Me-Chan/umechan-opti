import React, { CSSProperties } from 'react';
import { theme } from 'src/theme';

export enum TextVariant {
  'textHeading1' = 'textHeading1',
  'textBody1' = 'textBody1',
  'textBodyBold1' = 'textBodyBold1',
  'textButton' = 'textButton',
  'textInput' = 'textInput',
}

type Props = {
  tag?: keyof React.ReactHTML;
  variant?: TextVariant;
  color?: keyof typeof theme.colors;
  fontStyle?: CSSProperties['fontStyle'];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export const FONT_SIZES: Record<TextVariant, string> = {
  [TextVariant.textBody1]: '16px',
  [TextVariant.textBodyBold1]: '16px',
  [TextVariant.textHeading1]: '24px',
  [TextVariant.textButton]: '12px',
  [TextVariant.textInput]: '12px',
};

export const LINE_HEIGHTS: Record<TextVariant, string> = {
  [TextVariant.textBody1]: '16px',
  [TextVariant.textBodyBold1]: '16px',
  [TextVariant.textHeading1]: '24px',
  [TextVariant.textButton]: '12px',
  [TextVariant.textInput]: '12px',
};

export const FONT_WEIGHTS: Record<TextVariant, string> = {
  [TextVariant.textBody1]: '400',
  [TextVariant.textBodyBold1]: '700',
  [TextVariant.textHeading1]: '700',
  [TextVariant.textButton]: '700',
  [TextVariant.textInput]: '400',
};

export const Text = (props: Props) => {
  const {
    tag = 'span',
    color = 'colorTextPrimary',
    variant = TextVariant.textBody1,
    fontStyle,
    children,
    ...otherProps
  } = props;

  return React.createElement(
    tag,
    {
      style: {
        color: theme.colors[color],
        fontStyle,
        fontSize: FONT_SIZES[variant],
        fontWeight: FONT_WEIGHTS[variant],
        lineHeight: LINE_HEIGHTS[variant],
      },
      ...otherProps,
    },
    children,
  );
};
