import React from 'react';
import AiExecutive from './AiExecutive';
import AgentStatusLive from './AgentStatusLive';

export default function AIExecutiveIndex() {
  return (
    <div>
      <AiExecutive />
      <div className="mt-6">
        <AgentStatusLive />
      </div>
    </div>
  );
}
