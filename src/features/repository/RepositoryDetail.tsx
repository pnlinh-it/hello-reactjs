import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  repositoryId: string;
}
export default function RepositoryDetail() {
  const { repositoryId } = useParams<Params>();
  return <h1>Repository detail {repositoryId}</h1>;
}
