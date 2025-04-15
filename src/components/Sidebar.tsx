import React from 'react';
import { MessageSquare, Users, Hash, MessageCircle, Star, Clock, Building2 } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  count?: number;
  isOnline?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, count, isOnline }) => (
  <div className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-gray-100' : ''}`}>
    <div className="relative">
      {icon}
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
      )}
    </div>
    <span className="flex-grow text-gray-700">{label}</span>
    {count && <span className="text-sm text-gray-500">{count}</span>}
  </div>
);

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Main sections */}
      <div className="flex flex-col gap-1 py-2">
        <SidebarItem icon={<MessageSquare className="w-5 h-5 text-gray-600" />} label="Inbox" />
        <SidebarItem icon={<Users className="w-5 h-5 text-gray-600" />} label="Contacts" />
        <SidebarItem icon={<Hash className="w-5 h-5 text-gray-600" />} label="Channels" />
        <SidebarItem icon={<MessageCircle className="w-5 h-5 text-gray-600" />} label="Threads" />
      </div>

      {/* Favorites section */}
      <div className="mt-4">
        <div className="px-4 py-2 text-sm font-medium text-gray-500">Favorites</div>
        <SidebarItem 
          icon={<div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">T</div>}
          label="Team Standup"
          isActive={true}
        />
      </div>

      {/* Contact centers */}
      <div className="mt-4">
        <div className="px-4 py-2 text-sm font-medium text-gray-500">Contact centers</div>
        <SidebarItem 
          icon={<Building2 className="w-5 h-5 text-gray-600" />}
          label="Digital Engagement"
          isOnline={true}
        />
        <SidebarItem 
          icon={<Building2 className="w-5 h-5 text-pink-500" />}
          label="Aerolabs Support"
        />
        <SidebarItem 
          icon={<Building2 className="w-5 h-5 text-yellow-500" />}
          label="VIP Support"
        />
        <SidebarItem 
          icon={<Building2 className="w-5 h-5 text-blue-500" />}
          label="LATAM"
        />
      </div>

      {/* Recent section */}
      <div className="mt-4">
        <div className="px-4 py-2 text-sm font-medium text-gray-500">Recent</div>
        <SidebarItem 
          icon={<Clock className="w-5 h-5 text-gray-600" />}
          label="Recent chats"
        />
      </div>
    </div>
  );
}; 