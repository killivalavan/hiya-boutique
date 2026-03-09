// pages/admin/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Head from 'next/head';

const services = [
  'aari-embroidery-designing-customisation',
  'customization-custom-tailoring',
  'pre-pleating',
  'mehendi-art',
  'bridal-makeup-hair-style',
  'training'
];

const collections = [
  'silk-sarees',
  'artificial-jewellery'
];

type CloudinaryFile = {
  url: string;
  public_id: string;
  badge?: string | null;
};

// compress a File image to under ~1MB by resizing and lowering quality iteratively
async function compressImageTo1MB(file: File): Promise<Blob> {
  const maxSizeBytes = 1 * 1024 * 1024; // 1MB
  const imgBitmap = await createImageBitmap(file);
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d')!;
  let [width, height] = [imgBitmap.width, imgBitmap.height];

  // draw initial image
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(imgBitmap, 0, 0, width, height);

  let quality = 0.9;
  let blob: Blob | null = await new Promise(resolve =>
    canvas.toBlob(b => resolve(b!), 'image/jpeg', quality)
  ) as Blob;

  if (blob.size <= maxSizeBytes) return blob;

  // reduce quality
  while (quality > 0.3 && blob.size > maxSizeBytes) {
    quality -= 0.1;
    blob = await new Promise(resolve =>
      canvas.toBlob(b => resolve(b!), 'image/jpeg', quality)
    ) as Blob;
  }

  // if still too big, downscale progressively
  while (blob.size > maxSizeBytes && (width > 400 || height > 400)) {
    width = Math.round(width * 0.9);
    height = Math.round(height * 0.9);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imgBitmap, 0, 0, width, height);

    let localQuality = 0.8;
    blob = await new Promise(resolve =>
      canvas.toBlob(b => resolve(b!), 'image/jpeg', localQuality)
    ) as Blob;

    while (localQuality > 0.3 && blob.size > maxSizeBytes) {
      localQuality -= 0.1;
      blob = await new Promise(resolve =>
        canvas.toBlob(b => resolve(b!), 'image/jpeg', localQuality)
      ) as Blob;
    }
  }

  return blob;
}

export default function AdminPage() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [existingFiles, setExistingFiles] = useState<CloudinaryFile[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [popupEnabled, setPopupEnabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadPhase, setUploadPhase] = useState<'idle' | 'uploading' | 'processing'>('idle');

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') setHasAccess(true);
    else setHasAccess(false);
  }, []);

  useEffect(() => {
    fetch('/api/popup-flag')
      .then(res => res.json())
      .then(data => setPopupEnabled(data.enabled))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`/api/list?category=${selectedCategory}`)
        .then(res => res.json())
        .then(data => setExistingFiles(data.files || []))
        .catch(err => console.error('List error:', err));
    } else {
      setExistingFiles([]);
    }
  }, [selectedCategory]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const togglePopup = async () => {
    const newValue = !popupEnabled;
    try {
      const res = await fetch('/api/popup-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newValue })
      });
      if (res.ok) {
        setPopupEnabled(newValue);
        showToast(`Popup ${newValue ? 'enabled' : 'disabled'}`, 'success');
      }
    } catch (e) {
      showToast('Failed to toggle popup', 'error');
    }
  };

  const handleUpload = async () => {
    if (!selectedCategory || !files) {
      showToast('Please select category and images', 'error');
      return;
    }
    if (files.length > 10) {
      showToast('You can upload a maximum of 10 images at a time', 'error');
      return;
    }

    setIsUploading(true);
    setUploadPhase('uploading');
    setUploadProgress(null);

    try {
      const formData = new FormData();
      formData.append('category', selectedCategory);

      // compress each file to ~1MB before appending
      for (const file of Array.from(files)) {
        const compressedBlob = await compressImageTo1MB(file);
        const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });
        formData.append('images', compressedFile);
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        } else {
          setUploadProgress(null);
        }
      };

      xhr.upload.onloadend = () => {
        setUploadPhase('processing');
        setUploadProgress(null);
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          setIsUploading(false);
          setUploadPhase('idle');
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (data?.files?.length) {
                showToast('Upload successful!', 'success');
                setExistingFiles(prev => [...data.files, ...prev]);
                setFiles(null);
                const input = document.getElementById('images') as HTMLInputElement;
                if (input) input.value = '';
              } else {
                showToast('Upload succeeded but no file info returned', 'error');
              }
            } catch (e) {
              console.error('Parsing upload response failed', e);
              showToast('Upload succeeded but response parsing failed', 'error');
            }
          } else {
            let errMsg = 'Unknown error';
            try {
              const err = JSON.parse(xhr.responseText);
              errMsg = err.error || JSON.stringify(err);
            } catch {
              errMsg = xhr.responseText || xhr.statusText;
            }
            showToast('Upload failed: ' + errMsg, 'error');
          }
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        setUploadPhase('idle');
        showToast('Upload failed: network error', 'error');
      };

      xhr.send(formData);
    } catch (err: any) {
      console.error('Compression/upload error:', err);
      showToast('Upload failed: ' + (err.message || 'unknown'), 'error');
      setIsUploading(false);
      setUploadPhase('idle');
    }
  };

  const handleDelete = async (file: CloudinaryFile) => {
    if (!selectedCategory) return;
    if (!confirm(`Are you sure you want to delete this image?`)) return;

    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: file.public_id })
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Deleted successfully', 'success');
        setExistingFiles(existingFiles.filter(f => f.public_id !== file.public_id));
      } else {
        showToast('Delete failed: ' + (data?.error || 'Unknown error'), 'error');
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  const handleBadgeChange = async (file: CloudinaryFile, newBadge: string) => {
    const badgeValue = newBadge || null;

    if (!file.public_id || !selectedCategory) {
      showToast('One or more required fields are missing', 'error');
      return;
    }

    try {
      const res = await fetch(`${window.location.origin}/api/set-badge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          public_id: file.public_id,
          badge: badgeValue,
          category: selectedCategory
        })
      });

      const result = await res.json();
      if (res.ok) {
        showToast('Badge updated!', 'success');
        setExistingFiles(prev =>
          prev.map(f =>
            f.public_id === file.public_id ? { ...f, badge: badgeValue } : f
          )
        );
      } else {
        console.error('Badge update failed:', result.error);
        showToast('Failed to update badge', 'error');
      }
    } catch (e) {
      showToast('Failed to update badge', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    router.push('/admin/login');
  };

  if (hasAccess === null) return null;
  if (!hasAccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-red-600 font-medium">Access Denied. Please login.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Panel – Harsha's Boutique</title>
        <meta name="description" content="Admin panel for managing uploads, categories, and popup settings at Harsha's Boutique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Navbar />
      <div className="min-h-screen p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Upload Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={isUploading}
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto relative">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Popup Modal:</span>
            <button
              onClick={togglePopup}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${popupEnabled ? 'bg-green-500' : 'bg-gray-400'}`}
              disabled={isUploading}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${popupEnabled ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>

          <label htmlFor="category" className="block mb-2 font-semibold">Select Category</label>
          <select
            id="category"
            className="w-full mb-4 p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={isUploading}
          >
            <option value="">-- Select --</option>
            <optgroup label="Services">
              {services.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </optgroup>
            <optgroup label="Collections">
              {collections.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </optgroup>
            <optgroup label="Client Gallery">
              <option value="clients-gallery">Clients Gallery</option>
              <option value="whatsapp-testimonials">Whatsapp Screenshots</option>
            </optgroup>
          </select>

          <label htmlFor="images" className="block mb-2 font-semibold">Choose Images (max 10)</label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            className="mb-4 w-full"
            onChange={(e) => setFiles(e.target.files)}
            disabled={isUploading}
          />

          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              className="relative flex items-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="mr-2 flex items-center">
                    <div className="w-4 h-4 border-2 border-t-white border-r-white rounded-full animate-spin" />
                  </div>
                  {uploadPhase === 'uploading' ? (
                    uploadProgress !== null ? (
                      <span>Uploading ({uploadProgress}%)</span>
                    ) : (
                      <span>Uploading...</span>
                    )
                  ) : (
                    <span>Processing...</span>
                  )}
                </>
              ) : (
                'Upload'
              )}
            </button>

            {uploadPhase === 'uploading' && uploadProgress !== null && (
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-width"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {selectedCategory && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {existingFiles.length} images in this category
              </h3>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {existingFiles.map((file) => (
                  <div key={file.public_id} className="relative w-32 h-32 border rounded overflow-hidden">
                    <img
                      src={file.url.replace('/upload/', '/upload/w_200,q_60/')}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleDelete(file)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                      disabled={isUploading}
                    >
                      &times;
                    </button>

                    <select
                      className="absolute bottom-1 left-1 text-xs px-1 py-[2px] bg-white bg-opacity-90 border rounded"
                      value={file.badge || ''}
                      onChange={(e) => handleBadgeChange(file, e.target.value)}
                      disabled={isUploading}
                    >
                      <option value="">No Badge</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="Trending">Trending</option>
                      <option value="New">New</option>
                      <option value="100+ Bought">100+ Bought</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg z-50 transition-all duration-300
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
