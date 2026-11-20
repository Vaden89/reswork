import { useRef, useState } from 'react'
import { Modal } from '#/components/common/modal'
import { Button } from '#/components/common/button'
import { cn } from '#/utils/cn'
import {
  ArrowRightIcon,
  FilePlusCorner,
  FileText,
  FileUp,
  Plus,
  X,
} from 'lucide-react'
import { extractResumeText } from '#/utils/pdf'
import * as AiService from '#/services/ai.service'

import type { ReactNode } from 'react'
import type { TemplateData } from '#/types/template.type'

type CreateSectionOptionType = 'select' | 'upload' | 'blank'

export function CreateResumeModal({
  selectedTemplateId,
  createResume,
}: {
  selectedTemplateId: string | null
  createResume: (data?: TemplateData) => Promise<void>
}) {
  const [selectedOption, setSelectedOption] =
    useState<CreateSectionOptionType>('select')
  const [step, setStep] = useState(0)
  const [isCreating, setIsCreating] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [creationError, setCreationError] = useState<string | null>(null)

  async function handleContinue() {
    if (step === 0 && selectedOption != 'blank') {
      setStep(1)
      return
    }

    if (step === 0 && selectedOption === 'blank') {
      await createResume()
      return
    }

    if (
      step === 1 &&
      selectedOption === 'upload' &&
      uploadedFile &&
      extractedText
    ) {
      setIsCreating(true)
      setCreationError(null)

      try {
        const response = await AiService.parseResumeData({
          text: extractedText,
        })
        if (!('data' in response)) throw new Error(response.message)

        await createResume(response.data)
      } catch (error) {
        setCreationError(
          error instanceof Error
            ? error.message
            : 'Unable to import this resume.',
        )
      } finally {
        setIsCreating(false)
      }
    }
  }

  return (
    <Modal
      title={step === 1 ? 'Upload Resume' : undefined}
      trigger={
        <Button
          text="Continue"
          iconPosition="right"
          className="py-2 px-3 rounded-lg"
          disabled={!selectedTemplateId}
          icon={<ArrowRightIcon size={16} />}
        />
      }
      width="md"
      footer={
        <div className="flex gap-4 items-center justify-end">
          {step > 0 && (
            <Button
              className="rounded-lg"
              variants="ghost"
              text="Back"
              onClick={() => setStep(0)}
            />
          )}

          <Button
            text={isCreating ? 'Importing...' : 'Continue'}
            className="rounded-md py-2 px-3"
            onClick={handleContinue}
            disabled={
              isCreating ||
              (step === 0 && selectedOption === 'select') ||
              (step === 1 &&
                selectedOption === 'upload' &&
                (!uploadedFile || !extractedText))
            }
          />
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8">
        {step === 0 && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold">
              How would you like to start?
            </h2>
            <p className="text-xs text-secondary">
              Choose a method to begin drafting you next resume.
            </p>
          </div>
        )}
        {step === 0 && (
          <CreateOptionSection
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
        {step === 1 && selectedOption === 'upload' && (
          <UploadOptionSection
            file={uploadedFile}
            setFile={setUploadedFile}
            setExtractedText={setExtractedText}
          />
        )}
        {creationError && (
          <p role="alert" className="text-xs text-warning">
            {creationError}
          </p>
        )}
      </div>
    </Modal>
  )
}

function CreateOptionSection({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: CreateSectionOptionType
  setSelectedOption: (option: CreateSectionOptionType) => void
}) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-4">
      <StartOption
        title="Start from Scratch"
        icon={<FilePlusCorner size={20} />}
        isSelected={selectedOption === 'blank'}
        onClick={() => setSelectedOption('blank')}
        description="Begin with an empty and clean slate."
      />
      <StartOption
        title="Upload Resume"
        icon={<FileUp size={20} />}
        isSelected={selectedOption === 'upload'}
        onClick={() => setSelectedOption('upload')}
        description="We'll extract the information and fill the template."
      />
    </div>
  )
}

const MAX_FILE_SIZE = 1024 * 1024

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function UploadOptionSection({
  file,
  setFile,
  setExtractedText,
}: {
  file: File | null
  setFile: (file: File | null) => void
  setExtractedText: (text: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function validateAndSetFile(candidate: File | undefined) {
    if (!candidate) return

    if (candidate.type !== 'application/pdf') {
      setError('Only PDF files are supported.')
      return
    }

    if (candidate.size > MAX_FILE_SIZE) {
      setError('File exceeds the 1 MB size limit.')
      return
    }

    setError(null)
    setFile(candidate)
    setExtractedText(null)
    setIsExtracting(true)

    try {
      const text = await extractResumeText(candidate)
      if (!text.trim())
        throw new Error('No readable text was found in this PDF.')
      setExtractedText(text)
    } catch (extractionError) {
      setFile(null)
      setExtractedText(null)
      setError(
        extractionError instanceof Error
          ? extractionError.message
          : 'Unable to read this PDF.',
      )
    } finally {
      setIsExtracting(false)
    }
  }

  if (file) {
    return (
      <div className="w-full flex items-center gap-3 p-4 border border-border rounded-lg mt-4">
        <div className="p-2 bg-dark-gray rounded-md text-accent">
          <FileText size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold truncate">{file.name}</span>
          <span className="text-xs text-secondary">
            {isExtracting ? 'Extracting text…' : formatFileSize(file.size)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setFile(null)
            setExtractedText(null)
            setError(null)
          }}
          aria-label="Remove file"
          className="ml-auto p-1 text-secondary hover:text-accent cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-2 mt-4">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          validateAndSetFile(e.dataTransfer.files[0])
        }}
        className={cn(
          'w-full py-10 p-6 border-2 border-dashed rounded-lg flex items-center flex-col gap-2 text-sm text-center cursor-pointer',
          isDragging ? 'border-accent bg-accent/5' : 'border-accent/50',
        )}
      >
        <div className="relative">
          <div className="p-1.5 bg-dark-gray rounded-md border border-white text-secondary">
            <Plus size={20} />
          </div>
          <div className="w-full h-full bg-dark-gray rounded-md absolute -top-1.5 -right-1.5 -z-1" />
        </div>
        <span className="font-semibold text-secondary">
          Drag and Drop or{' '}
          <span className="text-accent underline underline-offset-2">
            Click to Browse
          </span>{' '}
        </span>
        <span className="text-xs text-secondary font-semibold">
          MAX FILE SIZE: 1 MB
        </span>
        <input
          type="file"
          accept="application/pdf"
          ref={inputRef}
          className="hidden"
          onChange={(e) => validateAndSetFile(e.target.files?.[0])}
        />
      </div>
      {error && <span className="text-xs text-warning">{error}</span>}
    </div>
  )
}

function StartOption({
  icon,
  title,
  description,
  isSelected,
  onClick,
}: {
  title: string
  icon: ReactNode
  description: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left border rounded p-4 flex flex-col justify-between cursor-pointer',
        isSelected ? 'border-accent' : 'border-border',
      )}
    >
      <div
        className={cn(
          'bg-dark-gray rounded-lg p-2 w-fit mb-8 sm:mb-10',
          isSelected ? 'text-accent' : 'text-black',
        )}
      >
        {icon}
      </div>
      <div className="h-full">
        <span className="font-semibold">{title}</span>
        <p className="text-xs text-secondary">{description}</p>
      </div>
    </button>
  )
}
