import React from 'react';

export default function ProtectedRoute() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/login?restricted=true" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/login?restricted=true');",
        }}
      />
      <div style={{ width: '100vw', height: '100svh', backgroundColor: '#05070d' }} />
    </>
  );
}
