import React, { CSSProperties } from "react";
import { ApiLayoutRef } from "src/service/base.api";
import { Box } from "../Box";

export const LayoutRenderer = ({ layout, children }: { layout: ApiLayoutRef, children: React.ReactNode | null }) => {
  const content = layout.map(item => {
    const key = `${item.type}_${item.name}`;

    if (item.type === 'layout') {
      return (
        <Box key={key} flexDirection={item.direction as CSSProperties['flexDirection']}>
          {(item.item as ApiLayoutRef).map((subItem) => <LayoutRenderer key={`subitem_${key}_${subItem.type}_${subItem.name}`} layout={[subItem]}>{children}</LayoutRenderer>)}
        </Box>
      );
    }

    if (item.name === 'Children') {
      return <React.Fragment key={key}>{children}</React.Fragment>;
    }

    return <pre key={key} style={{ whiteSpace: 'pre-wrap' }}><code>{JSON.stringify(item, null, 2)}</code></pre>
  });

  return <>{content}</>;
}
