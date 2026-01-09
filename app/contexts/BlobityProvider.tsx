"use client";
import { useEffect } from "react";
import useBlobity from "blobity/lib/react/useBlobity";
import { initialBlobityOptions } from "../utils/BlobityConfig";

export const BlobityProvider = ({ children }: { children: React.ReactNode }) => {
  const blobityInstance = useBlobity(initialBlobityOptions);

  useEffect(() => {
    if (blobityInstance.current) {
      // @ts-ignore for debugging purposes or playing around
      window.blobity = blobityInstance.current;
    }
  }, [blobityInstance]);

  return <>{children}</>;
};