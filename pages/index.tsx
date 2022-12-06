import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import AuthorSelector from './AuthorSelector';
import Chat from './Chat';

const Page = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>();

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
    console.log("Author is " + selectedAuthor);
  };

  return (
    <div className="main-container">
      <AuthorSelector onAuthorChange={handleAuthorChange} />
      <Chat selectedAuthor={selectedAuthor} />
    </div>
  );
};

export default Page;