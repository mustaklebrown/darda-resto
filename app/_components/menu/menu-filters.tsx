'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Make sure you have a utility for merging classes
import { X } from 'lucide-react';

interface MenuFiltersProps {
    categories: { id: string; name: string; slug: string }[];
    activeCategory: string;
    onSelectCategory: (slug: string) => void;
}

export default function MenuFilters({
    categories,
    activeCategory,
    onSelectCategory,
}: MenuFiltersProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 py-8">
            <FilterButton
                label="Tout"
                isActive={activeCategory === 'all'}
                onClick={() => onSelectCategory('all')}
            />
            {categories.map((category) => (
                <FilterButton
                    key={category.id}
                    label={category.name}
                    isActive={activeCategory === category.slug}
                    onClick={() => onSelectCategory(category.slug)}
                />
            ))}
            {activeCategory !== 'all' && (
                <button
                    onClick={() => onSelectCategory('all')}
                    className="flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors ml-2"
                >
                    <X className='w-4 h-4' /> Effacer
                </button>
            )}
        </div>
    );
}

function FilterButton({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border',
                isActive
                    ? 'text-primary-foreground border-primary bg-primary shadow-lg shadow-primary/25'
                    : 'text-foreground/70 border-transparent bg-secondary/50 hover:bg-secondary hover:text-foreground'
            )}
        >
            {label}
            {isActive && (
                <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-primary -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
}
