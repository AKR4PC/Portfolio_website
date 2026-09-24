"use client";

import dynamic from "next/dynamic";

const ParticleNetwork = dynamic(() => import("@/components/impact/ParticleNetwork"), {
  ssr: false,
  loading: () => <div className="network-loading" aria-hidden="true" />,
});

export function ParticleNetworkDynamic() {
  return <ParticleNetwork />;
}
