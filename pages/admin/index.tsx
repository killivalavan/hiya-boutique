import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'

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
  'dupatta'
];

export default function AdminPage() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedCategory || !files) {
      alert('Please select category and images');
      return;
    }

    if (files.length > 5) {
      alert('You can upload a maximum of 5 images at a time');
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
        alert('Upload successful!');
        setFiles(null);
        (document.getElementById('images') as HTMLInputElement).value = ''; // reset input
      } else {
        alert('Upload failed: ' + (data?.error || 'Unknown error'));
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      alert('Upload failed: ' + err.message);
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
        <Navbar />
        <div className="min-h-screen p-6 bg-gray-100">
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
          </div>
        </div>
    </>
  );
}
