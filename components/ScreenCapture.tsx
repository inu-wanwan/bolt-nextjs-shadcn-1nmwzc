'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, StopCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function ScreenCapture() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
      });

      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedChunks(chunks);
        setPreviewUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      toast.success('Screen recording started');
    } catch (err) {
      toast.error('Failed to start screen recording');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      toast.success('Screen recording stopped');
    }
  };

  const uploadRecording = async () => {
    if (recordedChunks.length === 0) {
      toast.error('No recording to upload');
      return;
    }

    const formData = new FormData();
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    formData.append('video', blob, 'screen-recording.webm');

    try {
      toast.promise(
        fetch('/api/upload', {
          method: 'POST',
          body: formData,
        }),
        {
          loading: 'Uploading recording...',
          success: 'Recording uploaded successfully',
          error: 'Failed to upload recording',
        }
      );
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Employee Interface
          </h1>
          <p className="text-gray-300 text-lg">
            Capture, preview, and analyze your screen recordings with ease
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 p-8 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <Button
                onClick={startRecording}
                disabled={isRecording}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Recording
              </Button>

              <Button
                onClick={stopRecording}
                disabled={!isRecording}
                variant="destructive"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Recording
              </Button>

              <Button
                onClick={uploadRecording}
                disabled={recordedChunks.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Recording
              </Button>
            </div>

            {previewUrl && (
              <div className="w-full mt-6">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Preview
                </h2>
                <video
                  src={previewUrl}
                  controls
                  className="w-full rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="High Quality Capture"
            description="Record your screen in high definition with smooth 30 FPS capture"
          />
          <FeatureCard
            title="Instant Preview"
            description="Review your recordings immediately with built-in video preview"
          />
          <FeatureCard
            title="Secure Upload"
            description="Automatically upload and process your recordings securely"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-2 text-blue-400">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </Card>
  );
}
