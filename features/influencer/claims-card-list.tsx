import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Brain, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils'; // Para las clases condicionales
import Link from 'next/link';
import type { Claim } from '@/types/influencer';

interface ClaimsCardListProps {
  claims: Claim[];
}

export default function ClaimsCardList({ claims }: ClaimsCardListProps) {
  return (
    <div className='space-y-6 py-10'>
      <h1 className='text-md text-white/70 font-bold'>
        Showing {claims.length} claims
      </h1>
      {claims.map(claim => (
        <Card
          key={claim._id}
          className='border-b border-gray-600 border-t-0 border-l-0 border-r-0 rounded-none'
        >
          <CardHeader className='pb-3'>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  {/* Status Badge */}
                  <Badge
                    variant='default'
                    className={cn(
                      'rounded-full px-4 py-1',
                      claim.status.toLowerCase() === 'verified' &&
                        'bg-[#34d399]/10 text-[#34d399]',
                      claim.status.toLowerCase() === 'questionable' &&
                        'bg-yellow-500/10 text-yellow-500',
                      claim.status.toLowerCase() === 'debunked' &&
                        'bg-red-500/10 text-red-500'
                    )}
                  >
                    {claim.status.toLowerCase()}
                  </Badge>
                  {/* Date */}
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span className='text-xs text-muted-foreground block'>
                    {new Date(claim.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
                {/* Claim Title */}
                <div className='w-3/4'>

                <h4 className='text-base text-white/90 font-semibold'>{claim.text}</h4>
                </div>
                {/* View Source */}
                <div className='flex items-center gap-2'>
                  <Link
                    href={claim.sources?.[0]?.url || ''}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-[#34d399] hover:underline flex items-center'
                  >
                    View Source
                    <ExternalLink className='h-4 w-4 ml-2' />
                  </Link>
                </div>
              </div>
              {/* Trust Score */}
              <Badge
                variant='ghost'
                className={cn(
                  'rounded-full px-4 py-1',
                  claim.confidence >= 85
                    ? 'text-[#34d399]' // Verde para confianza >= 85
                    : claim.confidence >= 70
                    ? 'text-yellow-500' // Amarillo para confianza >= 70
                    : 'text-red-500' // Rojo para confianza < 70
                )}
              >
                <div className='flex flex-col items-end gap-2 min-w-[70px]'>
                  <span className='text-xl'>{claim.confidence}%</span>
                  <span className='text-xs text-white/70'>Trust Score</span>
                </div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {/* AI Analysis */}
              <div className='space-y-2 pl-5 pt-5'>
                <div className='flex items-center gap-2'>
                  <Brain className='h-5 w-5 text-[#34d399]' />
                  <h5 className='text-sm font-semibold'> AI Analysis</h5>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {claim.sources?.[0]?.title || 'No analysis available.'}
                </p>
                {claim.sources?.[0]?.url && (
                  <a
                    href={claim.sources[0].url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-[#34d399] hover:underline flex items-center'
                  >
                    View Research
                    <ExternalLink className='h-4 w-4 ml-2' />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
