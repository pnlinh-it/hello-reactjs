import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  postId: string;
}
export default function UserPostDetail() {
  const { postId } = useParams<Params>();
  return <h3>Requested Post ID: {postId}</h3>;
}
