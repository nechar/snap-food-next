'use client';

import React from 'react';
import MainLayout from '@/components/Layout';
import CollectUserInformation from '@/components/CollectUserInformation';

const CollectUserInformationPage = () => {
  return (
    <MainLayout title="User Information">
      <CollectUserInformation onSave={() => {}} />
    </MainLayout>
  );
};

export default CollectUserInformationPage;