"use client"

import React from 'react';

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-md border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-primary transition ${props.className ?? ''}`}
    />
  );
}
