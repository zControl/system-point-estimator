import { cn } from "@/lib/utils";
import React from "react";
import { Helmet } from "react-helmet-async";

export interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
}

const PageContainer = ({
  children,
  title,
  description,
  keywords,
  className,
}: PageContainerProps) => {
  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Helmet>
      <main className={cn("w-full p-2 md:p-4 lg:p-6 flex-1", className)}>
        {children}
      </main>
    </>
  );
};

export { PageContainer };
