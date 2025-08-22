import { Box, Container, Heading, Image } from '@chakra-ui/react';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <Container maxW="container.lg" py={8}>
      <Box textAlign="center" mb={6}>
        <Image src="/static/logo.svg" alt="SnapFood Logo" boxSize="100px" mx="auto" mb={4} />
        <Heading as="h1" size="2xl" color="brand.600">
          {title}
        </Heading>
      </Box>
      {children}
    </Container>
  );
};

export default MainLayout;
