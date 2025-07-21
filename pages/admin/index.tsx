import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

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
  'casual-party-wear-sarees',
  'salwar-suits-unstitched',
  'kurtis-kurti-sets',
  'bottom-wears',
  'accessories',
  'maxi-frocks',
  'home-decors',
  'artificial-jewellery'
];

type CloudinaryFile = {
  url: string;
  public_id: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [existingFiles, setExistingFiles] = useState<CloudinaryFile[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [popupEnabled, setPopupEnabled] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, []);

  useEffect(() => {
    fetch('/api/popup-flag')
      .then(res => res.json())
      .then(data => setPopupEnabled(data.enabled));
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
    const res = await fetch('/api/popup-flag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: newValue })
    });
    if (res.ok) {
      setPopupEnabled(newValue);
      showToast(`Popup ${newValue ? 'enabled' : 'disabled'}`, 'success');
    }
  };

  const handleUpload = async () => {
    if (!selectedCategory || !files) {
      showToast('Please select category and images', 'error');
      return;
    }

    if (files.length > 5) {
      showToast('You can upload a maximum of 5 images at a time', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('category', selectedCategory);
    Array.from(files).forEach((file) => formData.append('images', file));

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Upload successful!', 'success');
        setFiles(null);
        (document.getElementById('images') as HTMLInputElement).value = '';
        fetch(`/api/list?category=${selectedCategory}`)
          .then(res => res.json())
          .then(data => setExistingFiles(data.files || []));
      } else {
        showToast('Upload failed: ' + (data?.error || 'Unknown error'), 'error');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      showToast('Upload failed: ' + err.message, 'error');
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

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    router.push('/admin/login');
  };

  if (hasAccess === null) return null;
  if (!hasAccess) {
    return (
      <>
        <Navbar />
        <div style={{ height: '90vh' }} className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-red-600 font-medium">Access Denied. Please login.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ height: '90vh' }} className="min-h-screen p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Upload Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Popup Modal:</span>
            <button
              onClick={togglePopup}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                popupEnabled ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                  popupEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <label htmlFor="category" className="block mb-2 font-semibold">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            autoComplete="off"
            className="w-full mb-4 p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select --</option>
            <optgroup label="Services">
              {services.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </optgroup>
            <optgroup label="New Collections">
              {collections.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </optgroup>
            <optgroup label="Client Gallery">
              <option value="clients-gallery">Clients Gallery</option>
              <option value="whatsapp-testimonials">Whatsapp Screenshots</option>
            </optgroup>
          </select>

          <label htmlFor="images" className="block mb-2 font-semibold">
            Choose Images (max 5)
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            autoComplete="off"
            className="mb-4 w-full"
            onChange={(e) => setFiles(e.target.files)}
          />

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>

          {selectedCategory && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {existingFiles.length} images in this category
              </h3>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {existingFiles.map((file) => (
                  <div key={file.public_id} className="relative w-32 h-32 border rounded overflow-hidden">
                    <img src={file.url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDelete(file)}
                      className="pb-1 absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg z-50 transition-all duration-300
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
