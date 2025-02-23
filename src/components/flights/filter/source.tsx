import { FC } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSources from '@/hooks/useSource';



interface SourceFilterProps {
  selectedSource: string;
  onSourceChange: (source: string) => void;
}

const SourceFilter: FC<SourceFilterProps> = ({ selectedSource, onSourceChange }) => {
  const { data: sources } = useSources();
  console.log(sources);
  return (
    <Select value={selectedSource} onValueChange={onSourceChange}>
      <SelectTrigger className="min-w-[180px] w-fit">
        <SelectValue placeholder="Select Source" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sources</SelectItem>
        {sources?.map((source) => (
          <SelectItem key={source.id} value={source.id}>
            {source.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SourceFilter;