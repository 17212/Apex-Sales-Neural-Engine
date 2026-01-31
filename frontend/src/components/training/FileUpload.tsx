'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, Check, Loader2 } from 'lucide-react';

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Filter for allowed types (PDF, TXT, DOCX)
    const validFiles = newFiles.filter(file => 
      ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
    );
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setFiles([]);
      // Here you would trigger a toast or update parent state
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-[var(--primary-500)] bg-[var(--primary-500)]/10' 
            : 'border-[var(--border-default)] hover:border-[var(--primary-500)] hover:bg-[var(--bg-tertiary)]'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept=".pdf,.txt,.docx"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        />
        
        <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4 border border-[var(--border-default)]">
          <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-[var(--primary-500)]' : 'text-[var(--text-tertiary)]'}`} />
        </div>
        
        <h3 className="text-lg font-bold mb-2">اسحب الملفات هنا أو اضغط للاختيار</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          يدعم PDF, Word, Text (بحد أقصى 10MB للملف)
        </p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary-500)]/10 flex items-center justify-center text-[var(--primary-500)] flex-shrink-0">
                    <File className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate text-sm">{file.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="p-2 hover:bg hover:text-red-500 transition-colors rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            <div className="flex justify-end pt-2">
              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="btn btn-primary px-8"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الرفع والمعالجة...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>بدء التدريب ({files.length})</span>
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
