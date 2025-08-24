import React, { useState, useEffect } from 'react';
import { ArrowRight, Book } from 'lucide-react';
import categoriesData from '../data/categories.json';

interface CategorySelectionProps {
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
}

export default function CategorySelection({ onCategorySelect, onBack }: CategorySelectionProps) {
  const [categories] = useState(categoriesData.categories);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-black hover:text-success mb-4"
        >
          <ArrowRight className="h-4 w-4 rotate-180 mr-2 text-black" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-black mb-2">Choose a Category</h1>
        <p className="text-black">Select a category to start your quiz adventure</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-secondary rounded-xl shadow-sm border border-secondary hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white inline-block border border-secondary">
                  <span className="text-2xl text-white">{category.icon}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-white group-hover:text-success transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
              <p className="text-white text-sm">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}