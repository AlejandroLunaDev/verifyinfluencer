import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // Asegúrate de tener cn configurado
import type { Claim } from '@/types/influencer';
import ClaimsCardList from './claims-card-list';

interface ClaimsListProps {
  claims: Claim[];
}

export function ClaimsList({ claims }: ClaimsListProps) {
  // Estados para los filtros seleccionados
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'All Categories'
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'All Statuses'
  ]);
  console.log(claims);
  // Función para manejar la selección de categorías
  const toggleCategory = (category: string) => {
    if (category === 'All Categories') {
      setSelectedCategories(['All Categories']);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev.filter(c => c !== 'All Categories'), category]
      );
    }
  };

  // Función para manejar la selección de estados
  const toggleStatus = (status: string) => {
    if (status === 'All Statuses') {
      setSelectedStatuses(['All Statuses']);
    } else {
      setSelectedStatuses(prev =>
        prev.includes(status)
          ? prev.filter(s => s !== status)
          : [...prev.filter(s => s !== 'All Statuses'), status]
      );
    }
  };

  return (
    <div className='space-y-6'>
      {/* Search and Filters Section */}
      <div className='flex bg-background2 p-4 rounded-[4px] h-[300px] border border-gray-600 flex-col gap-8 justify-center'>
        {/* Search Input */}
        <div className='relative'>
          <Search className='absolute left-3 top-2 h-5 w-5 text-white/70 ' />
          <Input
            className='pl-12 text-sm rounded-[4px] border bg-background border-gray-600 placeholder:text-white/70'
            placeholder='Search claims...'
          />
        </div>

        {/* Categories and Status Filters */}
        <div className='flex flex-wrap gap-4 text-white/80'>
          {/* Categories */}
          <article className='space-y-3'>
            <h4 className='text-sm font-semibold '>Categories</h4>
            <div className='flex flex-wrap gap-2'>
              {[
                'All Categories',
                'Sleep',
                'Performance',
                'Hormones',
                'Nutrition',
                'Exercise',
                'Stress',
                'Cognition',
                'Motivation',
                'Recovery',
                'Mental Health'
              ].map(category => (
                <Badge
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    'px-4 py-2 cursor-pointer rounded-full',
                    selectedCategories.includes(category)
                      ? ' text-white'
                      : 'bg-background text-muted-foreground'
                  )}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </article>
          <section className='flex gap-2  w-full'>
            {/* Status Filters */}
            <article className='space-y-3 w-1/2 '>
              <h4 className='text-sm font-semibold '>Status</h4>
              <div className='flex items-center justify-around  flex-nowrap gap-2'>
                {['All Statuses', 'Verified', 'Questionable', 'Debunked'].map(
                  status => (
                    <Badge
                      key={status}
                      onClick={() => toggleStatus(status)}
                      className={cn(
                        'px-4 py-2 cursor-pointer w-1/4 rounded-[4px]',
                        selectedStatuses.includes(status)
                          ? ' text-white'
                          : 'bg-background text-muted-foreground'
                      )}
                    >
                      {status}
                    </Badge>
                  )
                )}
              </div>
            </article>
            {/* Sorting Section */}
            <article className='space-y-3 w-1/2'>
              <span className='text-sm text-muted-foreground'>Sort By:</span>
              <div className='flex items-center gap-2'>
                <Select defaultValue='date'>
                  <SelectTrigger className='w-full text-sm'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='date'>Date</SelectItem>
                    <SelectItem value='trust'>Trust Score</SelectItem>
                    <SelectItem value='status'>Status</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant='outline' size='icon'>
                  <Filter className='h-5 w-5' />
                </Button>
              </div>
            </article>
          </section>
        </div>
      </div>

      {/* Claims List */}
      <ClaimsCardList claims={claims} />
    </div>
  );
}
