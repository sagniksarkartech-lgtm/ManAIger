import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4';

export const BoomerangVideoBg = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const capturedFrames = useRef<HTMLCanvasElement[]>([]);
  const lastTimeRef = useRef<number>(-1);
  const isCapturingRef = useRef<boolean>(true);
  const animFrameIdRef = useRef<number | null>(null);
  const videoCallbackIdRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    capturedFrames.current = [];
    lastTimeRef.current = -1;
    isCapturingRef.current = true;

    const captureFrame = () => {
      if (!isCapturingRef.current || !video) return;

      if (
        video.currentTime !== lastTimeRef.current &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        const maxW = 960;
        let targetW = video.videoWidth;
        let targetH = video.videoHeight;

        if (targetW > maxW) {
          targetH = Math.round((targetH * maxW) / targetW);
          targetW = maxW;
        }

        const offscreen = document.createElement('canvas');
        offscreen.width = targetW;
        offscreen.height = targetH;
        const offCtx = offscreen.getContext('2d');
        if (offCtx) {
          try {
            offCtx.drawImage(video, 0, 0, targetW, targetH);
            capturedFrames.current.push(offscreen);
            lastTimeRef.current = video.currentTime;
          } catch (e) {
            console.warn('Canvas capture error:', e);
          }
        }
      }

      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
        videoCallbackIdRef.current = (
          video as HTMLVideoElement & {
            requestVideoFrameCallback: (cb: () => void) => number;
          }
        ).requestVideoFrameCallback(captureFrame);
      } else {
        animFrameIdRef.current = requestAnimationFrame(captureFrame);
      }
    };

    const handlePlay = () => {
      isCapturingRef.current = true;
      captureFrame();
    };

    const handleEnded = () => {
      isCapturingRef.current = false;
      if (
        videoCallbackIdRef.current &&
        'cancelVideoFrameCallback' in HTMLVideoElement.prototype
      ) {
        (
          video as HTMLVideoElement & {
            cancelVideoFrameCallback: (id: number) => void;
          }
        ).cancelVideoFrameCallback(videoCallbackIdRef.current);
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }

      if (capturedFrames.current.length > 5) {
        setIsReady(true);
      } else {
        // Fallback: replay video if capture failed or too short
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    // Auto-play video on load
    video.play().catch((err) => {
      console.warn('Video playback notice:', err);
    });

    return () => {
      isCapturingRef.current = false;
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (
        videoCallbackIdRef.current &&
        'cancelVideoFrameCallback' in HTMLVideoElement.prototype
      ) {
        (
          video as HTMLVideoElement & {
            cancelVideoFrameCallback: (id: number) => void;
          }
        ).cancelVideoFrameCallback(videoCallbackIdRef.current);
      }
    };
  }, []);

  // Ping-pong / Boomerang animation loop on display canvas
  useEffect(() => {
    if (!isReady || capturedFrames.current.length === 0) return;

    const displayCanvas = canvasRef.current;
    if (!displayCanvas) return;

    const ctx = displayCanvas.getContext('2d');
    if (!ctx) return;

    let frameIndex = 0;
    let direction = 1;
    let lastTimestamp = performance.now();
    const fpsInterval = 1000 / 30; // 30 FPS
    let loopAnimId: number;

    const renderLoop = (now: number) => {
      loopAnimId = requestAnimationFrame(renderLoop);

      const elapsed = now - lastTimestamp;
      if (elapsed > fpsInterval) {
        lastTimestamp = now - (elapsed % fpsInterval);

        const currentFrameCanvas = capturedFrames.current[frameIndex];
        if (currentFrameCanvas) {
          if (
            displayCanvas.width !== currentFrameCanvas.width ||
            displayCanvas.height !== currentFrameCanvas.height
          ) {
            displayCanvas.width = currentFrameCanvas.width;
            displayCanvas.height = currentFrameCanvas.height;
          }
          ctx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
          ctx.drawImage(currentFrameCanvas, 0, 0);
        }

        // Advance index ping-pong
        frameIndex += direction;
        if (frameIndex >= capturedFrames.current.length - 1) {
          frameIndex = capturedFrames.current.length - 1;
          direction = -1;
        } else if (frameIndex <= 0) {
          frameIndex = 0;
          direction = 1;
        }
      }
    };

    loopAnimId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(loopAnimId);
    };
  }, [isReady]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="w-full h-full scale-[1.15] origin-top overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-top"
          style={{ display: isReady ? 'none' : 'block' }}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-top"
          style={{ display: isReady ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};
