"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import { Toaster } from "@/components/ui/toaster";

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}>
        {children}
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  );
};

export default RootProvider;
