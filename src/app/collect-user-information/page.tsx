'use client';

import React from 'react';
import MainLayout from '@/components/Layout';
import CollectUserInformation from '@/components/CollectUserInformation';
import { useRouter } from 'next/navigation';

const CollectUserInformationPage = () => {
  const router = useRouter();

  const handleSave = () => {
    router.push('/');
  };

  return (
    <MainLayout title="User Information">
      <CollectUserInformation onSave={handleSave} />
    </MainLayout>
  );
};

export default CollectUserInformationPage;