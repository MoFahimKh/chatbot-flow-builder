import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from '@xyflow/react';
import { Settings, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolbarNodeData {
  label: string;
  status?: 'running' | 'paused' | 'stopped';
}

export const ToolbarNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as ToolbarNodeData;
  const [status, setStatus] = useState<'running' | 'paused' | 'stopped'>(
    nodeData.status || 'stopped'
  );

  const handleStatusChange = (newStatus: 'running' | 'paused' | 'stopped') => {
    setStatus(newStatus);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'stopped': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <NodeToolbar isVisible className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleStatusChange('running')}
          className="!bg-flow-node !border-flow-node-border"
        >
          <Play className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleStatusChange('paused')}
          className="!bg-flow-node !border-flow-node-border"
        >
          <Pause className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleStatusChange('stopped')}
          className="!bg-flow-node !border-flow-node-border"
        >
          <Square className="w-3 h-3" />
        </Button>
      </NodeToolbar>

      <div className="bg-flow-node border border-flow-node-border rounded-lg p-4 min-w-[160px]"
           style={{ boxShadow: 'var(--shadow-node)' }}>
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-flow-handle !border-flow-handle !w-3 !h-3"
        />
        
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-md bg-accent/20">
            <Settings className="w-4 h-4 text-accent-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">{nodeData.label}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <span className="text-xs text-muted-foreground capitalize">{status}</span>
        </div>
        
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-flow-handle !border-flow-handle !w-3 !h-3"
        />
      </div>
    </>
  );
});