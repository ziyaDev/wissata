"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default RootProvider;
