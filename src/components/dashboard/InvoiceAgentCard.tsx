import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, FileCheck, Zap } from 'lucide-react';

export const InvoiceAgentCard = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>('INV-8910_Stratos_Cloud.pdf');

  const handleDropSim = () => {
    setFileName('INV-9410_Acme_Vendor_Invoice.pdf');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Invoice Agent</h3>
              <p className="text-xs text-indigo-300 font-medium">OCR & Vision Parsing</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            Running
          </span>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onClick={handleDropSim}
          className="border-2 border-dashed border-white/15 hover:border-indigo-400/50 rounded-2xl p-4 text-center bg-white/[0.02] hover:bg-indigo-500/[0.03] transition-all cursor-pointer mb-4"
        >
          <UploadCloud className="w-7 h-7 text-indigo-400 mx-auto mb-2" />
          <div className="text-xs font-semibold text-white">Drag & Drop Invoice PDF</div>
          <div className="text-[11px] text-gray-400 mt-0.5">Supports PDF, PNG, TIFF up to 25MB</div>
        </div>

        {/* Preview Area */}
        {fileName && (
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-300 shrink-0" />
              <span className="font-mono text-indigo-200 truncate max-w-[200px]">{fileName}</span>
            </div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase">Ready</span>
          </div>
        )}
      </div>

      {/* Process Invoice Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => navigate('/workflows')}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-200" />
          <span>Process Invoice</span>
        </button>
      </div>
    </motion.div>
  );
};
