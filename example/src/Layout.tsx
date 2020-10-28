import React from 'react';

type LayoutProps = React.CSSProperties;

export const Layout: React.FC<LayoutProps> = ({
  children,
  width = '100%',
  height = '100%',
  ...styleProps
}) => {
  return <div style={{ width, height, ...styleProps }}>{children}</div>;
};
