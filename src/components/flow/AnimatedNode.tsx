import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Sparkles } from 'lucide-react';

interface AnimatedNodeData {
  label: string;
  count?: number;
}

export const AnimatedNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as AnimatedNodeData;
  return (
    <div className="relative bg-flow-node border border-flow-node-border rounded-lg p-4 min-w-[180px] overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-20 animate-pulse"
        style={{ background: 'var(--gradient-primary)' }}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-flow-handle !border-flow-handle !w-3 !h-3"
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-md bg-primary-glow/20">
            <Sparkles className="w-4 h-4 text-primary-glow animate-pulse" />
          </div>
          <h3 className="font-semibold text-foreground">{nodeData.label}</h3>
        </div>
        
        {nodeData.count !== undefined && (
          <div className="text-2xl font-bold text-primary-glow">
            {nodeData.count.toLocaleString()}
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-flow-handle !border-flow-handle !w-3 !h-3"
      />
    </div>
  );
});