import { memo, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Edit3, Check, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TextNodeData {
  label: string;
  message: string;
}

export const TextNode = memo(({ data, id }: NodeProps) => {
  const nodeData = data as unknown as TextNodeData;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(nodeData.message || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(nodeData.message || "");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    // You should sync this with state/store
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(nodeData.message || "");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") handleCancel();
  };

  return (
    <div
      className="bg-[#e1fbe5] border rounded-2xl p-4 min-w-[220px] max-w-[280px] shadow-md"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-[#25D366] !border-white !w-3 !h-3"
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 rounded-md bg-[#25D366]/20">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
        </div>
        <h3 className="text-sm font-semibold text-foreground truncate flex-1">
          {nodeData.label}
        </h3>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="ml-auto h-6 w-6 p-0 hover:bg-accent"
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Message Area */}
      <div className="space-y-2">
        {isEditing ? (
          <>
            <Input
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-sm"
              placeholder="Enter your message..."
            />
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="h-6 px-2"
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="h-6 px-2"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground break-words leading-snug">
            {nodeData.message || "Click edit to add a message..."}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-[#25D366] !border-white !w-3 !h-3"
      />
    </div>
  );
});
