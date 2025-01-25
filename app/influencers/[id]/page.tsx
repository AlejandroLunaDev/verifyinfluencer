'use client';

import { useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, DollarSign, ShoppingBag } from 'lucide-react';
import { useInfluencerStore } from '@/lib/store/influencer-store';
import { MetricCard } from '@/features/influencer/metric-card';
import { ClaimsList } from '@/features/influencer/claims-list';

export default function InfluencerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Desestructuramos params como Promise

  const {
    selectedInfluencer: influencer,
    claims,
    fetchInfluencerById,
    fetchClaimsByInfluencerId,
  } = useInfluencerStore();

  useEffect(() => {
    // Llamadas para obtener datos del influencer y sus claims
    fetchInfluencerById(id);
    fetchClaimsByInfluencerId(id);
  }, [id, fetchInfluencerById, fetchClaimsByInfluencerId]);

  if (!influencer) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" pt-28 px-10 w-full">
      <div className="flex flex-col gap-6">
        {/* Header con avatar e información del influencer */}
        <div className="flex items-start gap-6">
          <Image
            src={influencer.avatar || '/placeholder.svg'}
            alt={influencer.name}
            width={150}
            height={150}
            className="rounded-full w-40 h-40"
          />
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{influencer.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {influencer.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl">{influencer.description}</p>
          </div>
        </div>

        {/* Métricas del influencer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Trust Score"
            value={`${influencer.trustScore}%`}
            description={`Based on ${influencer.verifiedClaims} verified claims`}
            trend="up"
          />
          <MetricCard
            label="Yearly Revenue"
            value={`$${(influencer.yearlyRevenue / 1000000).toFixed(1)}M`}
            description="Estimated earnings"
            icon={<DollarSign className="h-5 w-5 text-[#34d399]" />}
          />
          <MetricCard
            label="Products"
            value={(influencer.products ?? 0).toString()}
            description="Recommended products"
            icon={<ShoppingBag className="h-5 w-5 text-[#34d399]" />}
          />
          <MetricCard
            label="Followers"
            value={`${(influencer.followers / 1000000).toFixed(1)}M+`}
            description="Total following"
            icon={<Users className="h-5 w-5 text-[#34d399]" />}
          />
        </div>

        {/* Tabs con Claims, Products y Monetization */}
        <Tabs defaultValue="claims">
          <TabsList className="border-b border-gray-700">
            <TabsTrigger
              value="claims"
              className="text-muted-foreground hover:text-[#34d399] data-[state=active]:text-[#34d399] data-[state=active]:border-b-2 data-[state=active]:border-[#34d399] px-4 py-2"
            >
              Claims Analysis
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="text-muted-foreground hover:text-[#34d399] data-[state=active]:text-[#34d399] data-[state=active]:border-b-2 data-[state=active]:border-[#34d399] px-4 py-2"
            >
              Recommended Products
            </TabsTrigger>
            <TabsTrigger
              value="monetization"
              className="text-muted-foreground hover:text-[#34d399] data-[state=active]:text-[#34d399] data-[state=active]:border-b-2 data-[state=active]:border-[#34d399] px-4 py-2"
            >
              Monetization
            </TabsTrigger>
          </TabsList>

          {/* Contenido de los Tabs */}
          <TabsContent value="claims" className="mt-6">
            {/* Pasamos los claims obtenidos al componente ClaimsList */}
            <ClaimsList claims={claims || []} />
          </TabsContent>
          <TabsContent value="products">{/* Products content */}</TabsContent>
          <TabsContent value="monetization">{/* Monetization content */}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
