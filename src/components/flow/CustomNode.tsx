import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Zap } from 'lucide-react';

interface CustomNodeData {
  label: string;
  description?: string;
}

export const CustomNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as CustomNodeData;
  return (
    <div className="bg-flow-node border border-flow-node-border rounded-lg p-4 min-w-[200px]" 
         style={{ boxShadow: 'var(--shadow-node)' }}>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-flow-handle !border-flow-handle !w-3 !h-3"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 rounded-md bg-primary/20">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{nodeData.label}</h3>
      </div>
      
      {nodeData.description && (
        <p className="text-sm text-muted-foreground">{nodeData.description}</p>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-flow-handle !border-flow-handle !w-3 !h-3"
      />
    </div>
  );
});