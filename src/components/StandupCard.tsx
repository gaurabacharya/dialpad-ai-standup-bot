import React from 'react';
import { CheckCircle2, Circle, XCircle } from 'lucide-react';

interface StandupCardProps {
  member: string;
  completed: string[];
  working: string[];
  blockers: string[];
}

export const StandupCard: React.FC<StandupCardProps> = ({
  member,
  completed,
  working,
  blockers,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{member}</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            <h4 className="font-medium text-gray-700">Completed</h4>
          </div>
          <ul className="list-disc list-inside text-gray-600 ml-7">
            {completed.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Circle className="w-5 h-5 text-blue-500 mr-2" />
            <h4 className="font-medium text-gray-700">Working On</h4>
          </div>
          <ul className="list-disc list-inside text-gray-600 ml-7">
            {working.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {blockers.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <h4 className="font-medium text-gray-700">Blockers</h4>
            </div>
            <ul className="list-disc list-inside text-gray-600 ml-7">
              {blockers.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};