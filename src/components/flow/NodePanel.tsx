import { useState } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NodePanelProps {
  onAddNode: (type: string, data: any) => void;
}

export function NodePanel({ onAddNode }: NodePanelProps) {
  const [newNodeText, setNewNodeText] = useState("");

  const handleAddTextNode = () => {
    if (newNodeText.trim()) {
      onAddNode("text", {
        label: "Text Message",
        message: newNodeText.trim(),
      });
      setNewNodeText("");
    }
  };

  const handleDragStart = (event: React.DragEvent) => {
    const nodeData = {
      label: "Text Message",
      message: "Enter your message here...",
    };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: "text", data: nodeData })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-80 h-full bg-flow-node/95 backdrop-blur-sm border-r border-flow-node-border overflow-x-auto">
      <div className="p-4">
        <Card className="bg-flow-node border-flow-node-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Text Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Add Text Node */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Quick Add</h3>
              <div className="space-y-2">
                <Input
                  value={newNodeText}
                  onChange={(e) => setNewNodeText(e.target.value)}
                  placeholder="Enter your message..."
                  className="text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTextNode()}
                />
                <Button
                  onClick={handleAddTextNode}
                  disabled={!newNodeText.trim()}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Message
                </Button>
              </div>
            </div>

            {/* Drag to Add */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Drag to Canvas
              </h3>
              <Card
                className="bg-flow-bg border-flow-node-border cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={handleDragStart}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-500/20">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        Text Message
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Drag to add to canvas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
