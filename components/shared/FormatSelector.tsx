import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getConversionFormats } from "@/lib/file-format";

const FormatSelector = ({ fileExtension }: { fileExtension: string }) => {
  const availableFormats = getConversionFormats(fileExtension);

  return (
    <Select onValueChange={(v) => console.log(v)}>
      <SelectTrigger className="rounded">
        <SelectValue placeholder="Select a format" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(availableFormats).map(([category, formats]) => {
          if (formats && formats.length > 0) {
            return (
              <SelectGroup key={category}>
                <SelectLabel>{category.charAt(0).toUpperCase() + category.slice(1)}</SelectLabel>
                <div className="grid grid-cols-3 gap-1 px-2">
                  {formats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format.toUpperCase()}
                    </SelectItem>
                  ))}
                </div>
              </SelectGroup>
            );
          }
          return null;
        })}
      </SelectContent>
    </Select>
  );
};

export default FormatSelector;