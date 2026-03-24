import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users, Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import { WORKSHOPS } from '../constants';

interface WorkshopsProps {
  onSelect: (workshopId: string) => void;
}

export default function Workshops({ onSelect }: WorkshopsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {WORKSHOPS.map((workshop, index) => (
        <motion.div
          key={workshop.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative glass rounded-3xl overflow-hidden border border-white/10 hover:border-brand-purple/50 transition-all duration-500"
        >
          <div className="aspect-video overflow-hidden relative">
            <img 
              src={workshop.image} 
              alt={workshop.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 right-4 bg-brand-purple/90 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              {workshop.price}
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-2 mb-4">
              {workshop.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md bg-white/5 text-brand-blue border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-purple transition-colors">
              {workshop.title}
            </h3>
            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
              {workshop.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-4 h-4 text-brand-purple" />
                {workshop.date}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4 text-brand-purple" />
                {workshop.time}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users className="w-4 h-4 text-brand-purple" />
                {workshop.registered}/{workshop.capacity} Enrolled
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Star className="w-4 h-4 text-brand-purple" />
                {workshop.instructor}
              </div>
            </div>

            <button
              onClick={() => onSelect(workshop.id)}
              className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
