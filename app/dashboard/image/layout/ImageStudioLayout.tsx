"use client"

import React from "react"

type LayoutProps = {
  topbar: React.ReactNode
  workspace: React.ReactNode
  prompt: React.ReactNode
  thinking?: React.ReactNode
}

export default function ImageStudioLayout({
  topbar,
  workspace,
  prompt,
  thinking
}: LayoutProps){

  return(

    <div className="nira-layout">

      {/* ---------- TOP BAR (DIRECT - NO GAP) ---------- */}

      {topbar}


      {/* ---------- BODY ---------- */}

      <div className="nira-layout-body">

        {/* WORKSPACE (SCROLL AREA) */}

        <main className="nira-layout-workspace">
          {workspace}
        </main>


        {/* PROMPT BAR */}

        {prompt && (
          <div className="nira-layout-prompt">
            {prompt}
          </div>
        )}

      </div>


      {/* THINKING OVERLAY */}

      {thinking && (
        <div className="nira-layout-thinking">
          {thinking}
        </div>
      )}

    </div>

  )

}
