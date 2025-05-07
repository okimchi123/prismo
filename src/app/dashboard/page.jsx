"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  const handleToast = () =>{
    toast.warning('Hello');
  }


  return (
    <main>
      <h1>Dashboard</h1>
      <Button onClick={handleToast}> Toast here </Button>
    </main>
  );
}
