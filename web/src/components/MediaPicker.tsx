'use client'

import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  const onFileSelected = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }
  return (
    <div>
      <input
        accept="image/*"
        className="hidden"
        id="media"
        name="coverUrl"
        onChange={onFileSelected}
        type="file"
      />

      {preview && (
        // eslint-disable-next-line
        <img
          alt="Preview"
          className="aspect-video w-full rounded-lg object-cover"
          src={preview}
        />
      )}
    </div>
  )
}
