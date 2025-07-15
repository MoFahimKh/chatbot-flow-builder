import { FlowChart } from '@/components/flow/FlowChart';
import { ThemeProvider } from '@/components/ThemeProvider';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="w-full h-screen bg-flow-bg">
        <FlowChart />
      </div>
    </ThemeProvider>
  );
};

export default Index;
