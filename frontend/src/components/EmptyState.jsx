import { Sparkles } from "lucide-react";

const EmptyState = ({ text }) => (
  <div className="flex flex-col items-center justify-center text-center mt-32">
    <Sparkles size={48} className="text-lime-400 mb-4" />

    <h2 className="text-2xl font-bold text-white">{text}</h2>

    <p className="text-neutral-400 max-w-md mt-2">
      Looks quiet here. Once creators go live, their streams will appear here.
    </p>
  </div>
);

export default EmptyState;
