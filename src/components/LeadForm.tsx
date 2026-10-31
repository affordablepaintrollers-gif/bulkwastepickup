import { useState, useRef } from "react";
import { X, Upload, CheckCircle, AlertCircle, Loader2, ImagePlus, Trash2, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

interface LeadFormProps {
  onClose: () => void;
}

const containerTypes = [
  { id: "ibc_totes", label: "IBC Totes (275/330 Gallon)" },
  { id: "drums_55gal", label: "55 Gallon Drums (Steel/Plastic)" },
  { id: "gaylord_boxes", label: "Gaylord Boxes / Bulk Boxes" },
  { id: "buckets_5gal", label: "5 Gallon Buckets / Pails" },
];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma",
  "Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
  "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

type FormStatus = "idle" | "uploading" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  container_types: string[];
  quantity: string;
  condition: string;
  description: string;
}

export default function LeadForm({ onClose }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    container_types: [],
    quantity: "",
    condition: "",
    description: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleContainerType = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      container_types: prev.container_types.includes(id)
        ? prev.container_types.filter((t) => t !== id)
        : [...prev.container_types, id],
    }));
  };

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 10 - photos.length);
    const newUrls = newFiles.map((f) => URL.createObjectURL(f));
    setPhotos((prev) => [...prev, ...newFiles]);
    setPhotoPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoPreviewUrls[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (photos.length === 0) return [];
    const urls: string[] = [];
    for (const photo of photos) {
      const ext = photo.name.split(".").pop() || "jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { error } = await supabase.storage
        .from("lead-photos")
        .upload(filename, photo, { cacheControl: "3600", upsert: false });
      if (!error) {
        const { data: urlData } = supabase.storage
          .from("lead-photos")
          .getPublicUrl(filename);
        urls.push(urlData.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (formData.container_types.length === 0) {
      setErrorMessage("Please select at least one container type.");
      return;
    }
    setErrorMessage("");

    try {
      setStatus("uploading");
      const photoUrls = await uploadPhotos();

      setStatus("submitting");
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

      const res = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ ...formData, photo_urls: photoUrls }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or call us directly.");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#166534]/30 focus:border-[#166534] transition-all bg-white";
  const labelClass = "block text-xs font-black text-[#374151] uppercase tracking-wider mb-1.5";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Get a free quote form"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
        <div className="sticky top-0 bg-white px-6 py-5 flex items-center justify-between z-10 rounded-t-3xl border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-[#111827] tracking-tight">Get Your Free Quote</h2>
            <p className="text-sm text-[#6b7280] font-medium">We respond within 1 business hour</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {status === "success" ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#166534]" />
            </div>
            <h3 className="text-2xl font-black text-[#111827] mb-3">
              Quote Request Received!
            </h3>
            <p className="text-[#4b5563] mb-2 leading-relaxed">
              Thank you! We've received your container details and will have a quote
              to you within 1 business hour.
            </p>
            <p className="text-[#6b7280] text-sm mb-8">
              Check your email at <strong className="text-[#111827]">{formData.email}</strong> for our response.
            </p>
            <button
              onClick={onClose}
              className="bg-[#166534] hover:bg-[#14532d] text-white font-black px-8 py-3.5 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Your Name <span className="text-red-500 normal-case font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Industrial Co."
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Email Address <span className="text-red-500 normal-case font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  State <span className="text-red-500 normal-case font-bold">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select your state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Container Types <span className="text-red-500 normal-case font-bold">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {containerTypes.map((ct) => {
                  const selected = formData.container_types.includes(ct.id);
                  return (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() => toggleContainerType(ct.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? "border-[#166534] bg-[#f0fdf4] text-[#166534]"
                          : "border-gray-200 hover:border-gray-300 text-[#374151]"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selected ? "bg-[#166534] border-[#166534]" : "border-gray-300"
                      }`}>
                        {selected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-bold">{ct.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Estimated Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 50 IBC totes, 200 drums"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Overall Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select condition</option>
                  <option value="clean">Clean / Food Grade</option>
                  <option value="used_clean">Used but Clean</option>
                  <option value="dirty">Dirty / Residual Product</option>
                  <option value="blemished">Blemished / Mixed</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Additional Details</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="What was previously stored? Any special notes about location, access, or quantity details."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>
                Attach Photos{" "}
                <span className="text-gray-400 normal-case font-medium text-xs">
                  (Helps us give the most accurate quote — up to 10)
                </span>
              </label>

              {photoPreviewUrls.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-3">
                  {photoPreviewUrls.map((url, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                      <img src={url} alt={`Container photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 10 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#166534] flex items-center justify-center transition-colors"
                    >
                      <ImagePlus className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              )}

              {photos.length === 0 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-[#166534] rounded-xl p-6 flex flex-col items-center gap-2 transition-all group bg-gray-50 hover:bg-[#f0fdf4]"
                >
                  <Upload className="w-7 h-7 text-gray-300 group-hover:text-[#166534] transition-colors" />
                  <p className="text-sm font-bold text-gray-500 group-hover:text-[#166534] transition-colors">
                    Click to upload photos
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG, WebP up to 10MB each</p>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handlePhotos(e.target.files)}
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "uploading" || status === "submitting"}
              className="w-full bg-[#166534] hover:bg-[#14532d] disabled:bg-[#166534]/50 text-white font-black py-4 rounded-xl text-base transition-all active:scale-[0.99] flex items-center justify-center gap-3"
            >
              {status === "uploading" && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading Photos...
                </>
              )}
              {status === "submitting" && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Your Request...
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  Submit Quote Request — It's Free
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 font-medium">
              No obligation. We'll respond within 1 business hour.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
