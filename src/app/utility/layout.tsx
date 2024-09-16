"use client";
import Header from "@/components/header/header";
import { useNameStore } from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { name } = useNameStore();
  return (
    <>
      <Header userName={name}></Header>
      {children}
    </>
  );
}
