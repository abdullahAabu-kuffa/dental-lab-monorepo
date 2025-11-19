"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle, FileText } from '../../../src/utils/UnifiedIcons';
import { useNavigation, commonStyles, animations } from '../../../src/utils/pageUtils';

export default function UploadPage() {
  const { navigateToForm, navigateToHome } = useNavigation();

  return (
    <div className="w-full p-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        {...animations.fadeInUp}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upload Files & Notes</h1>
              <p className="text-gray-600">Upload documents and add special instructions</p>
            </div>
          </div>
          
          <button
            onClick={() => navigateToForm()}
            className={commonStyles.button.outline}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </button>
        </div>
      </motion.div>

      {/* File Upload Section */}
      <motion.div
        {...animations.fadeInUp}
        transition={{ delay: 0.1 }}
        className={commonStyles.card}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">📎 Upload Files</h2>
            <p className="text-sm text-gray-500">Upload documents, X-rays, or photos</p>
          </div>
        </div>
        
        <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#E4B441] hover:bg-gray-50 transition-colors">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
          <p className="text-sm text-gray-500">
            Supported: image/*,.pdf,.dcm,.dicom (Max 5 files)
          </p>
        </div>
      </motion.div>

      {/* Notes Section */}
      <motion.div
        {...animations.fadeInUp}
        transition={{ delay: 0.2 }}
        className={commonStyles.card}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">📝 Notes</h2>
            <p className="text-sm text-gray-500">Add any special instructions or notes</p>
          </div>
        </div>
        
        <textarea
          placeholder="Write your notes here..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441] resize-none"
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        {...animations.fadeInUp}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-4"
      >
        <button
          onClick={() => navigateToForm()}
          className={commonStyles.button.secondary}
        >
          Back to Form
        </button>
        
        <button
          onClick={() => navigateToHome()}
          className={commonStyles.button.primary}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Submit Order</span>
          </div>
        </button>
      </motion.div>
    </div>
  );
}