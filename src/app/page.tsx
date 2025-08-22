"use client";
import React, { useEffect } from "react";
import MainLayout from "@/components/Layout";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const alreadyCollected = localStorage.getItem("userInformation");
    if (!alreadyCollected) {
      router.push("/collect-user-information");
    } else {
      router.push("/dashboard");
    }
  }, []);

  return <MainLayout title="Welcome to SnapFood">Loading...</MainLayout>;
};

export default Home;
