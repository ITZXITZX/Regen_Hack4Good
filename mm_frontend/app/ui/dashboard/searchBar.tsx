'use client';
// next & react
import React from 'react';
// ui
import { Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// functions & state
import { useSearchStateStore } from '@/app/store';

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const { searchTerm, setSearchTerm } = useSearchStateStore();

  return (
    <Col xs={12}>
      <Form>
        <Form.Control
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder={`🔍 ${placeholder}`}
        />
      </Form>
    </Col>
  );
}
